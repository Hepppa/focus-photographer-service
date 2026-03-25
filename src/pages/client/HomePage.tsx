import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Input, Space, Rate } from 'antd';
import { HeartOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Search } = Input;

interface Photographer {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  city: string;
  avatar: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const photographers: Photographer[] = [
    { id: 1, name: 'Анна Смирнова', category: 'Свадебная съемка', price: 5000, rating: 4.9, reviews: 128, city: 'Москва', avatar: '' },
    { id: 2, name: 'Дмитрий Петров', category: 'Портретная съемка', price: 4500, rating: 4.8, reviews: 95, city: 'Санкт-Петербург', avatar: '' },
    { id: 3, name: 'Елена Волкова', category: 'Семейная съемка', price: 4000, rating: 4.9, reviews: 156, city: 'Москва', avatar: '' },
    { id: 4, name: 'Алексей Иванов', category: 'Репортажная съемка', price: 5500, rating: 4.7, reviews: 87, city: 'Казань', avatar: '' },
    { id: 5, name: 'Ольга Смирнова', category: 'Детская съемка', price: 3500, rating: 4.9, reviews: 203, city: 'Москва', avatar: '' },
    { id: 6, name: 'Михаил Сидоров', category: 'Бизнес-портрет', price: 5000, rating: 4.8, reviews: 64, city: 'Санкт-Петербург', avatar: '' },
    { id: 7, name: 'Кристина Орлова', category: 'Fashion съемка', price: 7000, rating: 4.9, reviews: 112, city: 'Москва', avatar: '' },
    { id: 8, name: 'Павел Морозов', category: 'Предметная съемка', price: 3500, rating: 4.7, reviews: 45, city: 'Москва', avatar: '' },
  ];

  const filteredPhotographers = photographers.filter(p =>
    searchText === '' || p.name.toLowerCase().includes(searchText.toLowerCase()) ||
    p.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Title level={1} style={{ fontSize: 48, marginBottom: 16 }}>
          ПРОФЕССИОНАЛЬНЫЕ ФОТОГРАФЫ
        </Title>
        <Text style={{ fontSize: 18, color: '#666', display: 'block', marginBottom: 32 }}>
          Найди идеального фотографа для любого события
        </Text>
        <Search
          placeholder="Поиск фотографа по имени или категории..."
          size="large"
          style={{ maxWidth: 600, width: '100%' }}
          onSearch={(value) => setSearchText(value)}
          enterButton="НАЙТИ"
        />
      </div>

      <Row gutter={[24, 24]}>
        {filteredPhotographers.map((photographer) => (
          <Col xs={24} sm={12} md={8} lg={6} key={photographer.id}>
            <Card
              hoverable
              onClick={() => navigate(`/photographers/${photographer.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#f0f0f0', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 40 }}>📷</span>
                </div>
                <Title level={4} style={{ marginBottom: 4 }}>{photographer.name}</Title>
                <Text type="secondary">{photographer.category}</Text>
                <div style={{ margin: '12px 0' }}>
                  <Space split={<span>•</span>}>
                    <Text><EnvironmentOutlined /> {photographer.city}</Text>
                    <Text><Rate disabled defaultValue={photographer.rating} style={{ fontSize: 12 }} /> ({photographer.reviews})</Text>
                    <Text strong>от {photographer.price} ₽/час</Text>
                  </Space>
                </div>
                <Button icon={<HeartOutlined />} type="link" onClick={(e) => { e.stopPropagation(); }}>В избранное</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;