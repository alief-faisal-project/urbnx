import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Admin {
  email: string;
  role: string;
}

interface AdminContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Demo credentials - In production, use proper backend authentication
const DEMO_ADMIN = {
  email: "admin@urbnx.com",
  password: "admin123",
  role: "admin",
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    // Check if admin session exists
    const savedAdmin = localStorage.getItem("urbnx_admin");
    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch {
        localStorage.removeItem("urbnx_admin");
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Demo authentication - Replace with backend API call
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      const adminData = { email: DEMO_ADMIN.email, role: DEMO_ADMIN.role };
      setAdmin(adminData);
      localStorage.setItem("urbnx_admin", JSON.stringify(adminData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("urbnx_admin");
  };

  return (
    <AdminContext.Provider
      value={{ admin, isAuthenticated: !!admin, login, logout }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
