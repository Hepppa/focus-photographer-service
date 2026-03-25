import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Tag, Button, Space, Typography, Divider, message } from 'antd';
import { CheckOutlined, CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Данные заказа (заглушка)
  const booking = {
    id: id,
    date: '2026-03-10',
    time: '10:00 - 13:00',
    client: 'Екатерина Иванова',
    service: 'Свадебная съемка',
    price: 25000,
    status: 'Новый',
    duration: 3,
    location: 'Москва, ул. Тверская, 15',
    requirements: 'Свадебная съемка в парке, желательно наличие фотоаппарата с зум-объективом',
  };

  const handleApprove = () => {
    message.success('Заказ одобрен');
    navigate('/photographer/dashboard');
  };

  const handleReject = () => {
    message.warning('Заказ отклонен');
    navigate('/photographer/dashboard');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
        Назад
      </Button>

      <Title level={2}>Детали заказа #{booking.id}</Title>

      <Card>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Клиент">
            <Text strong>{booking.client}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Услуга">{booking.service}</Descriptions.Item>
          <Descriptions.Item label="Дата">{booking.date}</Descriptions.Item>
          <Descriptions.Item label="Время">{booking.time}</Descriptions.Item>
          <Descriptions.Item label="Длительность">{booking.duration} часа</Descriptions.Item>
          <Descriptions.Item label="Место проведения">{booking.location}</Descriptions.Item>
          <Descriptions.Item label="Стоимость">{booking.price.toLocaleString()} ₽</Descriptions.Item>
          <Descriptions.Item label="Особые пожелания">{booking.requirements}</Descriptions.Item>
          <Descriptions.Item label="Статус">
            <Tag color={booking.status === 'Новый' ? 'blue' : 'green'}>{booking.status}</Tag>
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <div style={{ textAlign: 'center' }}>
          <Space size="large">
            <Button type="primary" size="large" icon={<CheckOutlined />} onClick={handleApprove}>
              Одобрить
            </Button>
            <Button danger size="large" icon={<CloseOutlined />} onClick={handleReject}>
              Отклонить
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default BookingDetailsPage;