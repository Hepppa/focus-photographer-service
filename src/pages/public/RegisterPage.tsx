import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Radio } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, CameraOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormData) => {
    if (values.password !== values.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setError('Ошибка регистрации');
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
      <Card style={{ width: 500 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={1} style={{ fontSize: 32, color: '#667eea' }}>FOCUS</Title>
          <Text type="secondary">Сервис для поиска фотографов</Text>
        </div>
        
        <Title level={4} style={{ textAlign: 'center' }}>Создайте аккаунт</Title>
        
        {error && <Alert message={error} type="error" showIcon style={{ marginTop: 16 }} />}
        {success && <Alert message="Регистрация успешна!" type="success" showIcon style={{ marginTop: 16 }} />}
        
        <Form onFinish={onFinish} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Введите имя' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Имя и фамилия" size="large" />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Введите email' }, { type: 'email', message: 'Введите корректный email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          
          <Form.Item
            name="role"
            rules={[{ required: true, message: 'Выберите тип аккаунта' }]}
          >
            <Radio.Group>
              <Radio.Button value="Client">
                <UserOutlined /> Клиент
              </Radio.Button>
              <Radio.Button value="Photographer">
                <CameraOutlined /> Фотограф
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль', min: 6 }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" size="large" />
          </Form.Item>
          
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Подтвердите пароль' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Подтвердите пароль" size="large" />
          </Form.Item>
          
          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            Зарегистрироваться
          </Button>
          
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Text type="secondary">
              Уже есть аккаунт? <a href="/login">Войти</a>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;