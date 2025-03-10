import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./routes";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
