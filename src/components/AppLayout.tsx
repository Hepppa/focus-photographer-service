import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Dropdown, Space, Avatar } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  HomeOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  AppstoreOutlined,
  HeartOutlined,
  CalendarOutlined,
  PictureOutlined,
  BarChartOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [];

    switch (role) {
      case 'Client':
        baseItems.push(
          {
            key: '/',
            icon: <HomeOutlined />,
            label: 'Главная',
            onClick: () => navigate('/'),
          },
          {
            key: '/favorites',
            icon: <HeartOutlined />,
            label: 'Избранное',
            onClick: () => navigate('/favorites'),
          },
          {
            key: '/my-bookings',
            icon: <CalendarOutlined />,
            label: 'Мои заказы',
            onClick: () => navigate('/my-bookings'),
          },
          {
            key: '/profile',
            icon: <UserOutlined />,
            label: 'Профиль',
            onClick: () => navigate('/profile'),
          }
        );
        break;

      case 'Photographer':
        baseItems.push(
          {
            key: '/photographer/dashboard',
            icon: <DashboardOutlined />,
            label: 'Дашборд',
            onClick: () => navigate('/photographer/dashboard'),
          },
          {
            key: '/photographer/schedule',
            icon: <CalendarOutlined />,
            label: 'Расписание',
            onClick: () => navigate('/photographer/schedule'),
          },
          {
            key: '/photographer/portfolio',
            icon: <PictureOutlined />,
            label: 'Портфолио',
            onClick: () => navigate('/photographer/portfolio'),
          },
          {
            key: '/photographer/statistics',
            icon: <BarChartOutlined />,
            label: 'Статистика',
            onClick: () => navigate('/photographer/statistics'),
          },
          {
            key: '/photographer/profile',
            icon: <UserOutlined />,
            label: 'Профиль',
            onClick: () => navigate('/photographer/profile'),
          }
        );
        break;

      case 'Admin':
        baseItems.push(
          {
            key: '/admin/dashboard',
            icon: <DashboardOutlined />,
            label: 'Панель управления',
            onClick: () => navigate('/admin/dashboard'),
          },
          {
            key: '/admin/categories',
            icon: <AppstoreOutlined />,
            label: 'Услуги',
            onClick: () => navigate('/admin/categories'),
          },
          {
            key: '/admin/users',
            icon: <TeamOutlined />,
            label: 'Пользователи',
            onClick: () => navigate('/admin/users'),
          },
          {
            key: '/admin/orders',
            icon: <UnorderedListOutlined />,
            label: 'Заказы',
            onClick: () => navigate('/admin/orders'),
          },
          {
            key: '/admin/reports',
            icon: <BarChartOutlined />,
            label: 'Отчеты',
            onClick: () => navigate('/admin/reports'),
          }
        );
        break;

      default:
        baseItems.push({
          key: '/',
          icon: <HomeOutlined />,
          label: 'Главная',
          onClick: () => navigate('/'),
        });
    }

    return baseItems;
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: user?.displayName,
      disabled: true,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Выйти',
      onClick: logout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 64, margin: 16, color: 'white', fontSize: 18, textAlign: 'center' }}>
          {!collapsed ? 'FOCUS' : 'F'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={getMenuItems()}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>
            {role === 'Client' && 'FOCUS - Сервис поиска фотографов'}
            {role === 'Photographer' && 'FOCUS - Панель фотографа'}
            {role === 'Admin' && 'FOCUS - Панель администратора'}
          </h2>
          <Space>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" style={{ height: '100%' }}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <Text strong>{user?.displayName || 'Гость'}</Text>
                  <Text type="secondary">
                    ({role === 'Client' ? 'Клиент' : role === 'Photographer' ? 'Фотограф' : role === 'Admin' ? 'Админ' : 'Не авторизован'})
                  </Text>
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;