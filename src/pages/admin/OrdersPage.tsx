import React from 'react';
import { Table, Tag, Button, Space, Typography, Select, message } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface Order {
  key: string;
  id: number;
  date: string;
  time: string;
  client: string;
  service: string;
  assignedTo: string;
  price: number;
  status: 'Новый' | 'Подтвержден' | 'Выполнен' | 'Отклонен';
}

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();

  const orders: Order[] = [
    { key: '1', id: 1, date: '2026-03-10', time: '10:00 - 13:00', client: 'Екатерина Иванова', service: 'Свадебная съемка', assignedTo: 'Не назначено', price: 25000, status: 'Новый' },
    { key: '2', id: 2, date: '2026-03-12', time: '09:00 - 10:00', client: 'Михаил Петров', service: 'Портретная съемка', assignedTo: 'Не назначено', price: 5000, status: 'Новый' },
    { key: '3', id: 3, date: '2026-03-11', time: '12:00 - 13:30', client: 'Ольга Смирнова', service: 'Семейная съемка', assignedTo: 'Анна', price: 7000, status: 'Подтвержден' },
    { key: '4', id: 4, date: '2026-02-20', time: '11:00 - 13:00', client: 'Анна Кузнецова', service: 'Love Story', assignedTo: 'Гарри', price: 10000, status: 'Выполнен' },
    { key: '5', id: 5, date: '2026-02-15', time: '10:00 - 11:30', client: 'Дмитрий Соколов', service: 'Бизнес-портрет', assignedTo: 'Анна', price: 5000, status: 'Выполнен' },
    { key: '6', id: 6, date: '2026-02-10', time: '15:00 - 16:00', client: 'Виктор Морозов', service: 'Детская съемка', assignedTo: 'Евгений', price: 4000, status: 'Выполнен' },
    { key: '7', id: 7, date: '2026-03-27', time: '19:00 - 20:00', client: 'Ирина Волкова', service: 'Предметная съемка', assignedTo: 'Не назначено', price: 3500, status: 'Новый' },
  ];

  const handleApprove = (record: Order) => {
    message.success(`Заказ №${record.id} одобрен`);
  };

  const handleReject = (record: Order) => {
    message.warning(`Заказ №${record.id} отклонен`);
  };

  const handleAssign = (record: Order, photographer: string) => {
    message.success(`Заказ №${record.id} назначен фотографу ${photographer}`);
  };

  const columns = [
    { title: 'Дата', dataIndex: 'date', key: 'date', width: 120 },
    { title: 'Время', dataIndex: 'time', key: 'time', width: 120 },
    { title: 'Клиент', dataIndex: 'client', key: 'client' },
    { title: 'Услуга', dataIndex: 'service', key: 'service' },
    {
      title: 'Назначено',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (assignedTo: string, record: Order) => (
        <Select
          defaultValue={assignedTo}
          style={{ width: 120 }}
          onChange={(value) => handleAssign(record, value)}
          options={[
            { value: 'Не назначено', label: 'Не назначено' },
            { value: 'Анна', label: 'Анна' },
            { value: 'Гарри', label: 'Гарри' },
            { value: 'Евгений', label: 'Евгений' },
          ]}
        />
      ),
    },
    { title: 'Стоимость', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()} ₽` },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = { 'Новый': 'blue', 'Подтвержден': 'green', 'Выполнен': 'cyan', 'Отклонен': 'red' };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 200,
      render: (_: unknown, record: Order) => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" onClick={() => navigate(`/admin/orders/${record.id}`)}>Детали</Button>
          {record.status === 'Новый' && (
            <>
              <Button type="primary" size="small" icon={<CheckOutlined />} onClick={() => handleApprove(record)}>Одобрить</Button>
              <Button danger size="small" icon={<CloseOutlined />} onClick={() => handleReject(record)}>Отклонить</Button>
            </>
          )}
          {record.status === 'Подтвержден' && (
            <Button size="small" icon={<EditOutlined />}>Завершить</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Управление заказами</Title>
      <Table columns={columns} dataSource={orders} />
    </div>
  );
};

export default OrdersPage;