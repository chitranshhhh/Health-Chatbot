import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi } from "@/services/apiService";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("healthhive_user");
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.removeItem("healthhive_user"); // Clear corrupted data
    }
    setIsLoading(false); // Ensure loading state is properly updated
  }, []); // Runs only once when the component mounts

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authApi.login(email, password);
  
      console.log("Login API Response:", response); // ✅ Debugging
  
      if (!response || !response.user || !response.token) {
        throw new Error("Invalid login response");
      }
  
      setUser(response.user);
      localStorage.setItem("healthhive_token", response.token);
      localStorage.setItem("healthhive_user", JSON.stringify(response.user));
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const signup = async (username: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const { user, token } = await authApi.signup(username, email, password);
      setUser(user);
      localStorage.setItem("healthhive_token", token);
      localStorage.setItem("healthhive_user", JSON.stringify(user));
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (user) {
        await authApi.logout(user.id);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("healthhive_token");
      localStorage.removeItem("healthhive_user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}