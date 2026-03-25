import React from 'react';
import { Card, Descriptions, Button, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/useAuth';

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
      <Title level={2}>Профиль</Title>
      
      <Card>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar size={100} icon={<UserOutlined />} />
          <Title level={3} style={{ marginTop: 16 }}>{user?.displayName || 'Иван Петров'}</Title>
          <Text type="secondary">Пользователь</Text>
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Email">{user?.email || 'user@example.com'}</Descriptions.Item>
          <Descriptions.Item label="Дата регистрации">2026-01-01</Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Button>Изменить фото</Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;