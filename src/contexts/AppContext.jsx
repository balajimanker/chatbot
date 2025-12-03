import { createContext, useContext, useState } from 'react';
import { mockConversations } from '../lib/mockData';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState('en');
    const [conversations] = useState(mockConversations);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                language,
                setLanguage,
                conversations,
                currentConversation,
                setCurrentConversation,
                searchQuery,
                setSearchQuery,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
