import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import UsersListPage from "./pages/UsersListPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(isAuth);
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      navigate("/users");
    } else {
      setIsAuth(false);
      navigate("/login");
    }
  }, [isAuth, navigate]);
  return (
    <>
      <div className="bg-gray-200 w-full min-h-[100vh]">
        <Header />
        <Routes>
          {isAuth ? <Route path="/users" element={<UsersListPage />} /> : null}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
