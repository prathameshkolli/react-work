import React, { createContext, useContext, useState } from 'react';

const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
    const [connectionDetails, setConnectionDetails] = useState({
        host: 'localhost',
        port: 5432,
        database: 'mydb',
        username: 'postgres',
        password: '1234',
    });
    
    const [isConnected, setIsConnected] = useState(false);

    return (
        <ConnectionContext.Provider value={{ connectionDetails, setConnectionDetails, isConnected, setIsConnected }}>
            {children}
        </ConnectionContext.Provider>
    );
};

export const useConnection = () => useContext(ConnectionContext);
