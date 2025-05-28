
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";

// Components
import Login from "./components/auth/Login";
import AppSidebar from "./components/layout/AppSidebar";
import Dashboard from "./components/dashboard/Dashboard";
import CaseRequestDashboard from "./components/caseRequest/CaseRequestDashboard";
import CasesPage from "./components/cases/CasesPage";
import HearingsPage from "./components/hearings/HearingsPage";
import EvidencePage from "./components/evidence/EvidencePage";
import RecordRoomPage from "./components/recordRoom/RecordRoomPage";
import UsersPage from "./components/users/UsersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Main Layout wrapper with sidebar
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-white">
      <AppSidebar />
      <motion.main 
        className="flex-1 p-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

// App Routes
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/case-requests" element={
        <ProtectedRoute>
          <Layout>
            <CaseRequestDashboard />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/cases" element={
        <ProtectedRoute>
          <Layout>
            <CasesPage />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/hearings" element={
        <ProtectedRoute>
          <Layout>
            <HearingsPage />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/evidence" element={
        <ProtectedRoute>
          <Layout>
            <EvidencePage />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/record-room" element={
        <ProtectedRoute>
          <Layout>
            <RecordRoomPage />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/users" element={
        <ProtectedRoute>
          <Layout>
            <UsersPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Redirect root to dashboard */}
      <Route 
        path="/" 
        element={<Navigate to="/dashboard" replace />} 
      />
      
      {/* Catch all other routes */}
      <Route 
        path="*" 
        element={<NotFound />} 
      />
    </Routes>
  );
};

// Main App Component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <SidebarProvider>
            <Router>
              <AppRoutes />
            </Router>
          </SidebarProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
