import ProtectedRoute from "@/components/protectedRoute";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import type { AppDispatch } from "@/store";
import { removeTokens, revalidateTokens } from "@/store/slice/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const access = localStorage.getItem("AccessToken");
    const refresh = localStorage.getItem("RefreshToken");

    if (access && refresh) {
      dispatch(
        revalidateTokens({ AccessToken: access, RefreshToken: refresh })
      );
    } else {
      dispatch(removeTokens());
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
