import { createContext, useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  // Hardcoded user for demo (replace with real auth in production)
  const demoUser = { email: "test@example.com", password: "password123" };

  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/api/login`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success("Login Successful");
      setUser({ email });
      return true;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      setUser(null);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
