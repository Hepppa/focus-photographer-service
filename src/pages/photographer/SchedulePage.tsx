import React, { useState } from 'react';
import { Calendar, Table, Tag, Button, Typography, Card, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface ScheduleItem {
  key: string;
  date: string;
  time: string;
  client: string;
  service: string;
  price: number;
  status: string;
}

const SchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const scheduleData: ScheduleItem[] = [
    { key: '1', date: '2026-03-17', time: '10:00 - 11:00', client: 'Екатерина Иванова', service: 'Свадебная съемка', price: 25000, status: 'Подтверждён' },
    { key: '2', date: '2026-03-17', time: '09:00 - 10:00', client: 'Михаил Петров', service: 'Портретная съемка', price: 5000, status: 'Подтверждён' },
    { key: '3', date: '2026-03-17', time: '12:00 - 13:30', client: 'Ольга Смирнова', service: 'Семейная съемка', price: 7000, status: 'Подтверждён' },
    { key: '4', date: '2026-03-18', time: '14:00 - 16:00', client: 'Анна Кузнецова', service: 'Love Story', price: 10000, status: 'Новый' },
  ];

  const filteredSchedule = scheduleData.filter(item => item.date === selectedDate.format('YYYY-MM-DD'));

  const columns = [
    { title: 'Время', dataIndex: 'time', key: 'time', width: 150 },
    { title: 'Клиент', dataIndex: 'client', key: 'client' },
    { title: 'Услуга', dataIndex: 'service', key: 'service' },
    { title: 'Стоимость', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()} ₽` },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Подтверждён' ? 'green' : 'blue'}>{status}</Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: ScheduleItem) => (
        <Space>
          <Button size="small" onClick={() => navigate(`/photographer/booking/${record.key}`)}>
            Детали
          </Button>
          {record.status === 'Подтверждён' && (
            <Button type="primary" size="small">Завершить</Button>
          )}
        </Space>
      ),
    },
  ];

  const dateCellRender = (date: Dayjs) => {
    const daySchedule = scheduleData.filter(item => item.date === date.format('YYYY-MM-DD'));
    if (daySchedule.length === 0) return null;
    return (
      <div style={{ background: '#e6f7ff', borderRadius: 4, padding: 2, textAlign: 'center' }}>
        <small>{daySchedule.length} заказа(ов)</small>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Title level={2}>Расписание</Title>

      <Card style={{ marginBottom: 24 }}>
        <Calendar
          value={selectedDate}
          onSelect={setSelectedDate}
          dateCellRender={dateCellRender}
          style={{ marginBottom: 24 }}
        />
      </Card>

      <Card title={`РАСПИСАНИЕ НА ${selectedDate.format('DD MMMM YYYY')}`}>
        <Table
          columns={columns}
          dataSource={filteredSchedule}
          pagination={false}
          locale={{ emptyText: 'Нет заказов на этот день' }}
        />
      </Card>
    </div>
  );
};

export default SchedulePage;