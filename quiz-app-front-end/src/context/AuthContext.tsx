import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  getEmail: string | null;
  setEmail: (value: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));
  const [getEmail, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    const email = localStorage.getItem("email");
    if (email) {
      setEmail(email.replace(/^"|"$/g, ""));
    }
    else {
      setEmail(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, getEmail, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
