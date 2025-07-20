import { createContext, useContext } from 'react'

export const PageRefreshContext = createContext(false);
export const usePageRefresh = () => useContext(PageRefreshContext);