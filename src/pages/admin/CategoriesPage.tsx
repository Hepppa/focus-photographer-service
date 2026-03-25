import React, { useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, InputNumber, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Service {
  key: string;
  id: number;
  name: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  description: string;
  image?: string;
}

interface ServiceFormValues {
  name: string;
  price: number;
  duration: string;
  description: string;
}

const CategoriesPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form] = Form.useForm();

  const [services, setServices] = useState<Service[]>([
    { key: '1', id: 1, name: 'Свадебная съемка', price: 15000, duration: '6-8 ч', rating: 4.8, reviews: 124, description: 'Профессиональная свадебная фотосессия' },
    { key: '2', id: 2, name: 'Портретная съемка', price: 3000, duration: '1-2 ч', rating: 4.9, reviews: 87, description: 'Индивидуальная портретная съемка' },
    { key: '3', id: 3, name: 'Семейная съемка', price: 4000, duration: '1-2 ч', rating: 4.7, reviews: 89, description: 'Семейная фотосессия' },
    { key: '4', id: 4, name: 'Love Story', price: 6000, duration: '2-3 ч', rating: 4.6, reviews: 156, description: 'Романтическая съемка' },
    { key: '5', id: 5, name: 'Детская съемка', price: 3500, duration: '1-2 ч', rating: 4.9, reviews: 208, description: 'Съемка детей' },
    { key: '6', id: 6, name: 'Бизнес-портрет', price: 5000, duration: '2-3 ч', rating: 4.8, reviews: 91, description: 'Деловой портрет' },
    { key: '7', id: 7, name: 'Спортивная съемка', price: 5500, duration: '2-3 ч', rating: 4.5, reviews: 78, description: 'Спортивные мероприятия' },
    { key: '8', id: 8, name: 'Предметная съемка', price: 2500, duration: '1-2 ч', rating: 4.9, reviews: 45, description: 'Съемка товаров' },
  ]);

  const columns = [
    { title: 'Изображение', dataIndex: 'image', key: 'image', width: 80, render: () => <div style={{ width: 50, height: 50, background: '#f0f0f0', borderRadius: 8 }} /> },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Цена (₽)', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()} ₽` },
    { title: 'Длительность', dataIndex: 'duration', key: 'duration' },
    { title: 'Рейтинг', dataIndex: 'rating', key: 'rating', render: (rating: number) => `${rating} ★` },
    { title: 'Отзывы', dataIndex: 'reviews', key: 'reviews' },
    { title: 'Описание', dataIndex: 'description', key: 'description', ellipsis: true },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: (_: unknown, record: Service) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)} />
          <Popconfirm title="Удалить услугу?" onConfirm={() => handleDelete(record.id)} okText="Да" cancelText="Нет">
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingService(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    form.setFieldsValue(service);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setServices(services.filter(s => s.id !== id));
    message.success('Услуга удалена');
  };

  const handleSubmit = (values: ServiceFormValues) => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...values } : s));
      message.success('Услуга обновлена');
    } else {
      const newId = Math.max(...services.map(s => s.id), 0) + 1;
      setServices([...services, { key: String(newId), id: newId, ...values, rating: 0, reviews: 0 }]);
      message.success('Услуга добавлена');
    }
    setModalVisible(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={2}>Управление услугами</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Добавить услугу
        </Button>
      </div>

      <Table columns={columns} dataSource={services} />

      <Modal
        title={editingService ? 'Редактирование услуги' : 'Добавление услуги'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Название" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Цена (₽)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="duration" label="Длительность" rules={[{ required: true }]}>
            <Input placeholder="например: 2-3 ч" />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesPage;