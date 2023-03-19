import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

function App() {
  const { currentUser } = useContext(UserContext);
  const ProtectRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/sign-in" />;
    }
    return children;
  };

  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/*"
          element={<h1>404 Page not found, get back to home page</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
