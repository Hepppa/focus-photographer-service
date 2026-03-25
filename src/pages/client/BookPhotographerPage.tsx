import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Space, DatePicker, Row, Col, Alert, message, Divider, Avatar, Rate, List } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const BookPhotographerPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const bookedSlots = ['10:00', '14:00', '16:00'];

  const photographer = {
    name: 'Анна Смирнова',
    category: 'Свадебная съемка',
    price: 20000,
    duration: 240,
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      message.warning('Выберите дату и время');
      return;
    }
    message.success('Запись успешно создана!');
    navigate('/my-bookings');
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Button style={{ marginBottom: 24 }} onClick={() => navigate(-1)}>← Назад</Button>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={16}>
          <Card title="Записаться на услугу">
            <div style={{ marginBottom: 24 }}>
              <Title level={4}>{photographer.category}</Title>
              <Text strong>{photographer.name}</Text>
              <div style={{ marginTop: 16 }}>
                <Space>
                  <Text>Услуга: <strong>{photographer.category}</strong></Text>
                  <Text>Цена: <strong>{photographer.price} ₽</strong></Text>
                  <Text>Длительность: <strong>{photographer.duration} минут ({photographer.duration / 60} часа)</strong></Text>
                </Space>
              </div>
            </div>

            <Divider />

            <div>
              <Text strong><CalendarOutlined /> Выберите дату</Text>
              <div style={{ marginTop: 12, marginBottom: 24 }}>
                <DatePicker 
                  onChange={(date) => setSelectedDate(date)}
                  style={{ width: '100%' }}
                  placeholder="Выберите дату"
                />
              </div>

              <Text strong><ClockCircleOutlined /> Выберите время</Text>
              <div style={{ marginTop: 12, marginBottom: 24 }}>
                <Row gutter={[8, 8]}>
                  {timeSlots.map(time => (
                    <Col key={time}>
                      <Button
                        type={selectedTime === time ? 'primary' : 'default'}
                        disabled={bookedSlots.includes(time)}
                        onClick={() => setSelectedTime(time)}
                        style={{ width: 70 }}
                      >
                        {time}
                      </Button>
                    </Col>
                  ))}
                </Row>
                <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
                  Свободные слоты отображаются белым цветом, занятые — серым.
                </Text>
              </div>

              {selectedDate && selectedTime && (
                <Alert
                  message="Вы выбрали"
                  description={`${selectedDate.format('DD.MM.YYYY')} в ${selectedTime}`}
                  type="info"
                  showIcon
                  style={{ marginBottom: 24 }}
                />
              )}

              <Space>
                <Button onClick={() => navigate(-1)}>Отмена</Button>
                <Button type="primary" onClick={handleConfirm}>Подтвердить запись</Button>
              </Space>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="История клиентов">
            <div style={{ marginBottom: 16 }}>
              <Text strong>Виктор Кузнецов</Text>
              <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>2026-01-10</Text>
            </div>
          </Card>

          <Card title="Отзывы" style={{ marginTop: 16 }}>
            <List
              dataSource={[
                {
                  author: 'Елена Волкова',
                  rating: 5,
                  date: '2026-02-10',
                  text: 'Получила отличную фотосессию! Очень приятный фотограф - подсказала как и что делать, фотки на выходе - ВАУ',
                  likes: 28,
                }
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space align="start">
                    <Avatar icon={<UserOutlined />} />
                    <div>
                      <Text strong>{item.author}</Text>
                      <Rate disabled defaultValue={item.rating} style={{ fontSize: 12 }} />
                      <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>{item.date}</Text>
                      <Paragraph style={{ marginTop: 8 }}>{item.text}</Paragraph>
                      <Space>
                        <Button size="small">👍 {item.likes}</Button>
                        <Button size="small">👎 0</Button>
                      </Space>
                    </div>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookPhotographerPage;