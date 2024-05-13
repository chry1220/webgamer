// AppProvider.js
import React, { useState } from 'react';
import AppContext from './createContext';

const AppProvider = ({ children }) => {
    const [allData, setAllData] = useState([]);

    return (
        <AppContext.Provider value={{ allData, setAllData }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;