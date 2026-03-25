import React from 'react';
import { Card, Row, Col, Statistic, Table, Typography, Button, Space } from 'antd';
import { UserOutlined, CameraOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const stats = {
    totalRevenue: 124500,
    totalPhotographers: 8,
    totalClients: 345,
    averageRating: 4.8,
    activeOrders: 7,
  };

  const recentOrders = [
    { key: '1', date: '2026-03-10', client: 'Екатерина Иванова', service: 'Свадебная съемка', price: 25000, status: 'Новый' },
    { key: '2', date: '2026-03-12', client: 'Михаил Петров', service: 'Портретная съемка', price: 5000, status: 'Новый' },
    { key: '3', date: '2026-03-11', client: 'Ольга Смирнова', service: 'Семейная съемка', price: 7000, status: 'Подтвержден' },
  ];

  const columns = [
    { title: 'Дата', dataIndex: 'date', key: 'date', width: 120 },
    { title: 'Клиент', dataIndex: 'client', key: 'client' },
    { title: 'Услуга', dataIndex: 'service', key: 'service' },
    { title: 'Сумма', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()} ₽` },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Панель управления</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Общая выручка" value={stats.totalRevenue} prefix="₽" valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Всего фотографов" value={stats.totalPhotographers} prefix={<CameraOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Всего клиентов" value={stats.totalClients} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Средний рейтинг" value={stats.averageRating} precision={1} suffix="/ 5" prefix={<StarOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card title="Активные заказы" extra={<Button type="link" onClick={() => navigate('/admin/orders')}>Все заказы</Button>}>
            <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>{stats.activeOrders}</div>
            <Table columns={columns} dataSource={recentOrders} pagination={false} size="small" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Быстрые действия">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button block onClick={() => navigate('/admin/categories')}>Управление услугами</Button>
              <Button block onClick={() => navigate('/admin/users')}>Управление пользователями</Button>
              <Button block onClick={() => navigate('/admin/orders')}>Управление заказами</Button>
              <Button block onClick={() => navigate('/admin/reports')}>Отчеты и статистика</Button>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Статистика">
            <div style={{ marginBottom: 16 }}>
              <div>Услуги - активных заказов: <strong>{stats.activeOrders}</strong></div>
              <div>Выполнено заказов: <strong>24</strong></div>
              <div>Средний чек: <strong>5 188 ₽</strong></div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboardPage;