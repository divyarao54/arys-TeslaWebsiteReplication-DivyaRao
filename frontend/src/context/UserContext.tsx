import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

// ⚠️ IMPORTANT: Set your backend API base URL
const API_URL = 'http://localhost:5000/api/auth'; 

// --- TypeScript Interfaces ---

interface UserState {
    _id?: string;
    name?: string;
    email?: string;
    token?: string;
    isLoggedIn: boolean;
}

// Renamed Context Interface
interface AuthContextType {
    user: UserState;
    loading: boolean;
    login: (data: any) => void;
    logout: () => void;
    fetchUserProfile: () => Promise<void>;
}

// Renamed Context Object
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Custom Hook (Renamed Export) ---
export const useAuth = () => { // 🔑 Hook renamed to useAuth
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// --- Provider Component (Renamed Export) ---

interface AuthProviderProps { // Interface renamed
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => { // 🔑 Component renamed to AuthProvider
    // Load initial state from localStorage if available
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

    // Helper function for authorization headers
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
        // ⚠️ You'll want to add redirection here after implementing your router
    };

    const fetchUserProfile = async () => {
        // ❌ Removed redundant log
        if (!user.token) {
            setLoading(false);
            return;
        }
        
        try {
            console.log("AuthContext: Attempting to fetch profile with token...");
            const { data } = await axios.get(`${API_URL}/profile`, getAuthHeaders());
            console.log("AuthContext: Profile fetch SUCCESS. User:", data.name);
            
            // Update state with confirmed data from the server
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

    // Verify token and fetch profile on mount
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

    // Show a loading screen while authentication is being verified
    return (
        <AuthContext.Provider value={contextValue}>
             {loading ? <div>Verifying Session...</div> : children}
        </AuthContext.Provider>
    );
};