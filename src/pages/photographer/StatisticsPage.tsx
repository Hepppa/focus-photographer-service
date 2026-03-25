import React from 'react';
import { Card, Row, Col, Statistic, Table, Progress, Typography } from 'antd';
import { DollarOutlined, ShoppingOutlined, ClockCircleOutlined, StarOutlined } from '@ant-design/icons';

const { Title } = Typography;

const StatisticsPage: React.FC = () => {
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

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Title level={2}>Статистика фотографа</Title>

      {/* Основные показатели */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Выполнено заказов" value={24} prefix={<ShoppingOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Заработано" value={124500} prefix={<DollarOutlined />} suffix="₽" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="В ожидании" value={3} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Средний чек" value={5188} prefix="₽" />
          </Card>
        </Col>
      </Row>

      {/* Статистика по услугам */}
      <Card title="Статистика по услугам" style={{ marginBottom: 24 }}>
        <Table columns={columns} dataSource={serviceStats} pagination={false} />
      </Card>

      {/* Статус заявок и рейтинг */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Статус заявок">
            <div style={{ marginBottom: 16 }}>
              <div>Ожидают: <strong>3</strong></div>
              <Progress percent={30} status="active" strokeColor="#1890ff" />
            </div>
            <div>
              <div>В работе: <strong>2</strong></div>
              <Progress percent={20} status="active" strokeColor="#52c41a" />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Рейтинг">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, color: '#faad14' }}>★★★★★</div>
              <Title level={3} style={{ marginTop: 8 }}>4.9 / 5</Title>
              <div style={{ marginTop: 8, color: '#666' }}>
                <StarOutlined /> Всего выполнено услуг: 24
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsPage;