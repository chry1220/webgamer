// Create a new file called context.js
import { createContext, useState, useContext, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState({});
    async function loadData() {
        try {
            const response = await fetch('/api/files');
            const allPageData = await response.json();
            setGlobalState({ allPageData });
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
    useEffect(() => {

        loadData();
    }, [])
    return (
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
