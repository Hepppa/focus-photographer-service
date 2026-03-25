import React from 'react';
import { Card, Row, Col, Statistic, Table, Typography, Progress } from 'antd';
import { CameraOutlined, UserOutlined, StarOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ReportsPage: React.FC = () => {
  const serviceStats = [
    { key: '1', service: 'Свадебная фотосъемка', count: 8, revenue: 112500 },
    { key: '2', service: 'Портретная съемка', count: 6, revenue: 30000 },
    { key: '3', service: 'Семейная фотосъемка', count: 5, revenue: 25000 },
    { key: '4', service: 'Детская фотосъемка', count: 2, revenue: 8000 },
  ];

  const columns = [
    { title: 'Услуга', dataIndex: 'service', key: 'service' },
    { title: 'Количество', dataIndex: 'count', key: 'count', width: 120 },
    { title: 'Выручка', dataIndex: 'revenue', key: 'revenue', render: (value: number) => `${value.toLocaleString()} ₽` },
  ];

  const photographers = [
    { name: 'Анна Смирнова', completed: 12, rating: 4.9 },
    { name: 'Дмитрий Петров', completed: 8, rating: 4.8 },
    { name: 'Елена Волкова', completed: 6, rating: 4.7 },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Отчеты и статистика</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Общая выручка" value={124500} prefix="₽" valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Всего фотографов" value={8} prefix={<CameraOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Всего клиентов" value={345} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Средний рейтинг" value={4.8} precision={1} suffix="/ 5" prefix={<StarOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card title="Услуги - активных заказов">
            <div style={{ fontSize: 48, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>7</div>
            <Progress percent={35} status="active" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Статистика по услугам">
            <Table columns={columns} dataSource={serviceStats} pagination={false} size="small" />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Лучшие фотографы">
            {photographers.map((p, idx) => (
              <div key={idx} style={{ marginBottom: 16 }}>
                <div><strong>{p.name}</strong> - {p.completed} выполненных заказов</div>
                <div style={{ fontSize: 12, color: '#666' }}>Рейтинг: {p.rating} ★</div>
                <Progress percent={(p.completed / 12) * 100} size="small" />
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportsPage;