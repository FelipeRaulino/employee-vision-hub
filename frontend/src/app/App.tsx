// src/App.tsx
import SidebarLayout from "@/layouts/SidebarLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "@/contexts/AuthContext";
import RequireAuth from "@/components/RequireAuth";
import "primeicons/primeicons.css";

function App() {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <RequireAuth>
                  <SidebarLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </PrimeReactProvider>
  );
}

export default App;
