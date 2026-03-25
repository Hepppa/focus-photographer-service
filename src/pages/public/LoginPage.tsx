import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

const { Title, Text } = Typography;

interface UserData {
  id: string;
  displayName: string;
  email: string;
  role: 'Client' | 'Photographer' | 'Admin';
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers: Record<string, UserData> = {
        'client@focus.com': { id: '1', displayName: 'Иван Клиент', email: values.email, role: 'Client' },
        'photographer@focus.com': { id: '2', displayName: 'Анна Фотограф', email: values.email, role: 'Photographer' },
        'admin@focus.com': { id: '3', displayName: 'Администратор', email: values.email, role: 'Admin' },
      };
      
      const user = mockUsers[values.email];
      
      if (user && values.password === '123456') {
        login('mock-token-123', user);
        navigate('/');
      } else {
        setError('Неверный email или пароль');
      }
    } catch {
      setError('Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    }}>
      <Card style={{ width: 450 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={1} style={{ fontSize: 32, color: '#667eea' }}>FOCUS</Title>
          <Text type="secondary">Сервис для поиска фотографов</Text>
        </div>
        
        <Title level={4} style={{ textAlign: 'center' }}>Войдите в свой аккаунт</Title>
        
        {error && <Alert message={error} type="error" showIcon style={{ marginTop: 16 }} />}
        
        <Form onFinish={onFinish} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Введите email' }, { type: 'email', message: 'Введите корректный email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" size="large" />
          </Form.Item>
          
          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            Войти
          </Button>
          
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Text type="secondary">
              Нет аккаунта? <a href="/register">Зарегистрироваться</a>
            </Text>
          </div>
          
          <div style={{ marginTop: 24, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              <strong>Тестовые данные:</strong><br />
              Клиент: client@focus.com / 123456<br />
              Фотограф: photographer@focus.com / 123456<br />
              Админ: admin@focus.com / 123456
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;