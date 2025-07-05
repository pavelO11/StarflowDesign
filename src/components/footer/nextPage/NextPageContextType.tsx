import { createContext, useContext, useState } from 'react'

type NextPageContextType = {
  title: string;
  setTitle: (title: string) => void;
  delayTitle: boolean;
  setDelayTitle: (delay: boolean) => void;
};

export const NextPageContext = createContext<NextPageContextType>({
  title: '',
  setTitle: () => {},
  delayTitle: false,
  setDelayTitle: () => {},
});

export const useNextPageContext = () => useContext(NextPageContext);

export function NextPageProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('');
  const [delayTitle, setDelayTitle] = useState(false);
  
  return (
    <NextPageContext.Provider value={{ title, setTitle, delayTitle, setDelayTitle }}>
      {children}
    </NextPageContext.Provider>
  );
}