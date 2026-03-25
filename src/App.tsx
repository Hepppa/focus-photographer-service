import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/useAuth';

// Components
import AppLayout from './components/AppLayout';
import RequireAuth from './components/RequireAuth';
import PageNotFound from './components/PageNotFound';

// Public pages
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import PhotographerDetailPage from './pages/client/PhotographerDetailPage';
import BookPhotographerPage from './pages/client/BookPhotographerPage';

// Client pages
import HomePage from './pages/client/HomePage';
import FavoritesPage from './pages/client/FavoritesPage';
import ProfilePage from './pages/client/ProfilePage';
import MyBookingsPage from './pages/client/MyBookingsPage';

// Photographer pages
import PhotographerDashboardPage from './pages/photographer/PhotographerDashboardPage';
import BookingDetailsPage from './pages/photographer/BookingDetailsPage';
import SchedulePage from './pages/photographer/SchedulePage';
import PortfolioPage from './pages/photographer/PortfolioPage';
import StatisticsPage from './pages/photographer/StatisticsPage';
import PhotographerProfilePage from './pages/photographer/PhotographerProfilePage';

// Admin pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import UsersPage from './pages/admin/UsersPage';
import OrdersPage from './pages/admin/OrdersPage';
import ReportsPage from './pages/admin/ReportsPage';

const queryClient = new QueryClient();

const AppRoutes: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  
  console.log('AppRoutes - isAuthenticated:', isAuthenticated, 'role:', role);  // <-- ДЛЯ ОТЛАДКИ

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');  // <-- ДЛЯ ОТЛАДКИ
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/photographers/:id" element={<PhotographerDetailPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  console.log('Authenticated, role:', role);  // <-- ДЛЯ ОТЛАДКИ

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/register" element={<Navigate to="/" replace />} />
      <Route path="/photographers/:id" element={<PhotographerDetailPage />} />
      <Route path="/book/:photographerId" element={<BookPhotographerPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={
            (() => {
              console.log('Rendering home page for role:', role);  // <-- ДЛЯ ОТЛАДКИ
              if (role === 'Client') return <HomePage />;
              if (role === 'Photographer') return <PhotographerDashboardPage />;
              if (role === 'Admin') return <AdminDashboardPage />;
              console.log('No matching role, redirecting to login');  // <-- ДЛЯ ОТЛАДКИ
              return <Navigate to="/login" replace />;
            })()
          } />
          
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          
          <Route path="/photographer/dashboard" element={<PhotographerDashboardPage />} />
          <Route path="/photographer/booking/:id" element={<BookingDetailsPage />} />
          <Route path="/photographer/schedule" element={<SchedulePage />} />
          <Route path="/photographer/portfolio" element={<PortfolioPage />} />
          <Route path="/photographer/statistics" element={<StatisticsPage />} />
          <Route path="/photographer/profile" element={<PhotographerProfilePage />} />
          
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider locale={ruRU} theme={{ algorithm: theme.defaultAlgorithm }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
