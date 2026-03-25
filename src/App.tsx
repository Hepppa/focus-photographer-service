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
import RequireRole from './components/RequireRole';
import PageNotFound from './components/PageNotFound';
import PageLoading from './components/PageLoading';

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
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <PageLoading />;
  }

  // Если пользователь не авторизован - показываем только страницы входа и регистрации
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/photographers/:id" element={<PhotographerDetailPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Если пользователь авторизован - показываем все страницы
  return (
    <Routes>
      {/* Перенаправляем с login/register на главную */}
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/register" element={<Navigate to="/" replace />} />
      <Route path="/photographers/:id" element={<PhotographerDetailPage />} />

      {/* Защищенные маршруты */}
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          {/* Маршруты для клиента */}
          <Route element={<RequireRole allowedRoles={['Client']} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/book/:photographerId" element={<BookPhotographerPage />} />
          </Route>

          {/* Маршруты для фотографа - главная перенаправляет на дашборд */}
          <Route element={<RequireRole allowedRoles={['Photographer']} />}>
            <Route path="/" element={<Navigate to="/photographer/dashboard" replace />} />
            <Route path="/photographer/dashboard" element={<PhotographerDashboardPage />} />
            <Route path="/photographer/booking/:id" element={<BookingDetailsPage />} />
            <Route path="/photographer/schedule" element={<SchedulePage />} />
            <Route path="/photographer/portfolio" element={<PortfolioPage />} />
            <Route path="/photographer/statistics" element={<StatisticsPage />} />
            <Route path="/photographer/profile" element={<PhotographerProfilePage />} />
          </Route>

          {/* Маршруты для администратора - главная перенаправляет на дашборд */}
          <Route element={<RequireRole allowedRoles={['Admin']} />}>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
          </Route>
        </Route>
      </Route>

      {/* 404 */}
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