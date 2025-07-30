import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface PageRefreshContextType {
  isPageRefresh: boolean;
  isPageRefreshing: boolean;
  showContent: boolean;
}

const PageRefreshContext = createContext<PageRefreshContextType>({
  isPageRefresh: false,
  isPageRefreshing: false,
  showContent: false,
});

export const PageRefreshProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isPageRefresh, setIsPageRefresh] = useState(() => {
    const hasPageLoaded = sessionStorage.getItem('pageLoaded');
    return !hasPageLoaded;
  });
  
  const [isPageRefreshing, setIsPageRefreshing] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Первая загрузка страницы
  useEffect(() => {
    if (isPageRefresh) {
      sessionStorage.setItem('pageLoaded', 'true');
      setIsPageRefreshing(true);
      setShowContent(false);
      
      const timer = setTimeout(() => {
        setIsPageRefreshing(false);
        setShowContent(true);
        setIsPageRefresh(false);
      }, 3800);
      
      return () => clearTimeout(timer);
    }
  }, [isPageRefresh]);

  // Переходы между страницами
  useEffect(() => {
    if (!isPageRefresh) {
      setIsPageRefreshing(true);
      setShowContent(false);
      
      const timer = setTimeout(() => {
        setIsPageRefreshing(false);
        setShowContent(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isPageRefresh]);

  // Сброс флага при реальной перезагрузке
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('pageLoaded');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <PageRefreshContext.Provider value={{ isPageRefresh, isPageRefreshing, showContent }}>
      {children}
    </PageRefreshContext.Provider>
  );
};

export const usePageRefresh = () => {
  const context = useContext(PageRefreshContext);
  return context.isPageRefresh;
};

export const usePageRefreshing = () => {
  const context = useContext(PageRefreshContext);
  return context.isPageRefreshing;
};

export const useShowContent = () => {
  const context = useContext(PageRefreshContext);
  return context.showContent;
};