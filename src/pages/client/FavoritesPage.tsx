import React from 'react';
import { Card, Row, Col, Typography, Empty } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface Favorite {
  id: number;
  name: string;
  category: string;
  city: string;
  price: number;
}

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const favorites: Favorite[] = []; // пока пусто

  if (favorites.length === 0) {
    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Избранное</Title>
        <Empty description="У вас пока нет избранных услуг" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Title level={2}>Избранное</Title>
      <Row gutter={[24, 24]}>
        {favorites.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            <Card hoverable onClick={() => navigate(`/photographers/${item.id}`)}>
              <div style={{ textAlign: 'center' }}>
                <Title level={4}>{item.name}</Title>
                <Text type="secondary">{item.category}</Text>
                <div><EnvironmentOutlined /> {item.city}</div>
                <Text strong>от {item.price} ₽/час</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FavoritesPage;