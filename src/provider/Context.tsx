import { ReactNode, createContext } from 'react';

export const Context = createContext<null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const contextValue = null;

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
