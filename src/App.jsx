import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Boards from "./pages/boards/boards";
import NotFound from "./pages/page-not-found";
import "./App.css";

const AuthProtector = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route
        path="boards"
        element={
          <AuthProtector>
            <Boards />
          </AuthProtector>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
