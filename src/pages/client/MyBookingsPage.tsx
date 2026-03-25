import React from 'react';
import { Table, Button, Tag, Typography, Card, Row, Col, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface Booking {
  key: string;
  date: string;
  time: string;
  service: string;
  price: number;
  photographer: string;
  status: 'Новый' | 'Одобрено' | 'Завершено' | 'Отменено';
}

const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();

  const bookings: Booking[] = [
    {
      key: '1',
      date: '2026-03-27',
      time: '10:00 - 14:00',
      service: 'Свадебная съемка',
      price: 20000,
      photographer: 'Анна Смирнова',
      status: 'Новый',
    },
  ];

  const statusCounts = {
    waiting: bookings.filter(b => b.status === 'Новый').length,
    approved: bookings.filter(b => b.status === 'Одобрено').length,
    completed: bookings.filter(b => b.status === 'Завершено').length,
    cancelled: bookings.filter(b => b.status === 'Отменено').length,
  };

  const columns = [
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    { title: 'Время', dataIndex: 'time', key: 'time' },
    { title: 'Услуга', dataIndex: 'service', key: 'service' },
    { title: 'Стоимость', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()} ₽` },
    { title: 'Фотограф', dataIndex: 'photographer', key: 'photographer' },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          'Новый': 'blue',
          'Одобрено': 'green',
          'Завершено': 'cyan',
          'Отменено': 'red',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Действия',
      key: 'action',
      render: () => (
        <Button type="link" onClick={() => navigate(`/photographers/1`)}>
          Посмотреть услугу
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Title level={2}>Мои заказы</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Ожидает" value={statusCounts.waiting} valueStyle={{ color: '#1890ff' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Одобрено" value={statusCounts.approved} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Завершено" value={statusCounts.completed} valueStyle={{ color: '#13c2c2' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Отменено" value={statusCounts.cancelled} valueStyle={{ color: '#f5222d' }} />
          </Card>
        </Col>
      </Row>

      <Table columns={columns} dataSource={bookings} />

      {bookings.length > 0 && (
        <div style={{ marginTop: 24, textAlign: 'right' }}>
          <Button danger>Отменить заказ</Button>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;