import React from 'react';
import { Card, Descriptions, Avatar, Button, Typography, Rate, Divider, Space } from 'antd';
import { MailOutlined, CalendarOutlined, StarOutlined, CameraOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PhotographerProfilePage: React.FC = () => {
  const photographer = {
    name: 'Анна Смирнова',
    role: 'Фотограф',
    email: 'photographer@example.com',
    registrationDate: '2025-06-15',
    rating: 4.9,
    completedOrders: 24,
    avatar: '',
    bio: 'Профессиональный фотограф с 5-летним опытом. Специализируюсь на свадебной и портретной съемке.',
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
      <Title level={2}>Профиль фотографа</Title>

      <Card>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar size={100} icon={<CameraOutlined />} style={{ backgroundColor: '#722ed1' }} />
          <Title level={3} style={{ marginTop: 16 }}>{photographer.name}</Title>
          <Text type="secondary">{photographer.role}</Text>
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label={<><MailOutlined /> Email</>}>{photographer.email}</Descriptions.Item>
          <Descriptions.Item label={<><CalendarOutlined /> Дата регистрации</>}>{photographer.registrationDate}</Descriptions.Item>
          <Descriptions.Item label={<><StarOutlined /> Рейтинг</>}>
            <Rate disabled defaultValue={photographer.rating} allowHalf /> {photographer.rating}
          </Descriptions.Item>
          <Descriptions.Item label={<><CameraOutlined /> Выполнено услуг</>}>{photographer.completedOrders}</Descriptions.Item>
          <Descriptions.Item label="О себе">{photographer.bio}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <div style={{ textAlign: 'center' }}>
          <Space>
            <Button type="primary">Редактировать профиль</Button>
            <Button>Изменить фото</Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default PhotographerProfilePage;