import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, Typography, Rate, Divider, List, Avatar, Space, message } from 'antd';
import { HeartOutlined, EnvironmentOutlined, UserOutlined, StarOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/useAuth';

const { Title, Text, Paragraph } = Typography;

const PhotographerDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const photographer = {
    id: 1,
    name: 'Анна Смирнова',
    category: 'Свадебная съемка',
    price: 5000,
    rating: 4.9,
    reviews: 128,
    city: 'Москва',
    description: 'Профессиональная свадебная фотосессия. Работаю в паре с видеографом. Отдаю 500+ обработанных фото, цветокоррекция, авторский стиль. Выезжаю в любую точку Москвы и области.',
    includes: [
      'Предсвадебная консультация',
      'Съемка до 10 часов',
      '500+ фото в авторской обработке',
      'Слайд-шоу под музыку',
      'Запись на флешку и в облако',
    ],
    reviewsList: [
      {
        id: 1,
        author: 'Виктор Кузнецов',
        rating: 4,
        date: '2026-01-10',
        text: 'Отличная работа!',
        likes: 15,
        dislikes: 0,
      },
      {
        id: 2,
        author: 'Елена Волкова',
        rating: 5,
        date: '2026-02-10',
        text: 'Получила отличную фотосессию! Очень приятный фотограф - подсказала как и что делать, фотки на выходе - ВАУ',
        likes: 28,
        dislikes: 0,
      },
    ],
  };

  const handleBook = () => {
    if (!isAuthenticated) {
      message.info('Пожалуйста, войдите в систему для записи');
      navigate('/login');
      return;
    }
    
    if (user?.role === 'Photographer') {
      message.warning('Фотографы не могут записываться на услуги');
      return;
    }
    
    navigate(`/book/${id}`);
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      message.info('Пожалуйста, войдите в систему для добавления в избранное');
      navigate('/login');
      return;
    }
    message.success('Добавлено в избранное');
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Button style={{ marginBottom: 24 }} onClick={() => navigate(-1)}>← Назад</Button>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={120} icon={<UserOutlined />} style={{ marginBottom: 16 }} />
              <Title level={3}>{photographer.name}</Title>
              <Text type="secondary">{photographer.category}</Text>
              <div style={{ margin: '16px 0' }}>
                <Space split={<span>•</span>}>
                  <Text><EnvironmentOutlined /> {photographer.city}</Text>
                  <Text><StarOutlined /> {photographer.rating}</Text>
                </Space>
              </div>
              <Rate disabled defaultValue={photographer.rating} allowHalf />
              <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>{photographer.reviews} отзывов</Text>
            </div>
            <Divider />
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#f50' }}>от {photographer.price} ₽/час</Title>
              <Space>
                <Button type="primary" size="large" onClick={handleBook}>
                  Записаться на услугу
                </Button>
                <Button size="large" icon={<HeartOutlined />} onClick={handleFavorite}>
                  В избранное
                </Button>
              </Space>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="О фотографе">
            <Paragraph>{photographer.description}</Paragraph>
            
            <Divider>В стоимость входит:</Divider>
            <ul>
              {photographer.includes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <Divider>Отзывы</Divider>
            <List
              dataSource={photographer.reviewsList}
              renderItem={(review) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Space>
                        <Text strong>{review.author}</Text>
                        <Rate disabled defaultValue={review.rating} style={{ fontSize: 12 }} />
                        <Text type="secondary">{review.date}</Text>
                      </Space>
                    }
                    description={
                      <>
                        <Paragraph>{review.text}</Paragraph>
                        <Space>
                          <Button size="small">👍 {review.likes}</Button>
                          <Button size="small">👎 {review.dislikes}</Button>
                        </Space>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PhotographerDetailPage;