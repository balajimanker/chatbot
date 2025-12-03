import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <Outlet />
  )
}
const App = () => (
  <AppProvider>
    <Toaster />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:chatId" element={<Chat />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AppProvider>
);

export default App;
