import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; 


interface UserState {
    _id?: string;
    name?: string;
    email?: string;
    token?: string;
    isLoggedIn: boolean;
}

interface AuthContextType {
    user: UserState;
    loading: boolean;
    login: (data: any) => void;
    logout: () => void;
    fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => { 
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


interface AuthProviderProps { 
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => { 
    const [user, setUser] = useState<UserState>(() => {
        const userData = localStorage.getItem('userInfo');
        try {
            const parsedData = userData ? JSON.parse(userData) : {};
            return { ...parsedData, isLoggedIn: !!parsedData.token };
        } catch (e) {
            console.error("Error parsing user data from localStorage:", e);
            return { isLoggedIn: false };
        }
    });
    const [loading, setLoading] = useState(true);

    const getAuthHeaders = () => {
        const token = user.token;
        return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    };

    const login = (data: any) => {
        const userData: UserState = {
            _id: data._id,
            name: data.name,
            email: data.email,
            token: data.token,
            isLoggedIn: true,
        };
        setUser(userData);
        localStorage.setItem('userInfo', JSON.stringify(userData));
    };

    const logout = () => {
        setUser({ isLoggedIn: false });
        localStorage.removeItem('userInfo');
    };

    const fetchUserProfile = async () => {
        if (!user.token) {
            setLoading(false);
            return;
        }
        
        try {
            console.log("AuthContext: Attempting to fetch profile with token...");
            const { data } = await axios.get(`${API_URL}/profile`, getAuthHeaders());
            console.log("AuthContext: Profile fetch SUCCESS. User:", data.name);
            
            setUser(prev => ({
                ...prev,
                name: data.name,
                email: data.email,
                isLoggedIn: true,
            }));
            
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || (error as any).message;
            console.error("AuthContext: Profile fetch FAILED.", errorMessage);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const contextValue: AuthContextType = {
        user,
        loading,
        login,
        logout,
        fetchUserProfile,
    };

    return (
        <AuthContext.Provider value={contextValue}>
             {loading ? <div>Verifying Session...</div> : children}
        </AuthContext.Provider>
    );
};