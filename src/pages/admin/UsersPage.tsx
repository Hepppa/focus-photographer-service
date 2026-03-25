import React, { useState } from 'react';
import { Table, Button, Space, Tag, Typography, Modal, Form, Input, Select, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface User {
  key: string;
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Photographer' | 'Client';
  registrationDate: string;
}

interface UserFormValues {
  name: string;
  email: string;
  role: 'Admin' | 'Photographer' | 'Client';
  password?: string;
}

const UsersPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const [users, setUsers] = useState<User[]>([
    { key: '1', id: 1, name: 'Иван Петров', email: 'user@example.com', role: 'Client', registrationDate: '2023-01-01' },
    { key: '2', id: 2, name: 'Анна Смирнова', email: 'photographer@example.com', role: 'Photographer', registrationDate: '2025-06-15' },
    { key: '3', id: 3, name: 'Филиппова', email: 'admin@example.com', role: 'Admin', registrationDate: '2025-01-01' },
    { key: '4', id: 4, name: 'Анна Лягина', email: 'annia@example.com', role: 'Client', registrationDate: '2025-01-15' },
    { key: '5', id: 5, name: 'Евгений Павлов', email: 'evgeniy@example.com', role: 'Client', registrationDate: '2025-03-10' },
  ]);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const colors: Record<string, string> = { Admin: 'red', Photographer: 'blue', Client: 'green' };
        return <Tag color={colors[role]}>{role}</Tag>;
      },
    },
    { title: 'Дата регистрации', dataIndex: 'registrationDate', key: 'registrationDate' },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: (_: unknown, record: User) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)} />
          <Popconfirm title="Удалить пользователя?" onConfirm={() => handleDelete(record.id)} okText="Да" cancelText="Нет">
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    message.success('Пользователь удален');
  };

  const handleSubmit = (values: UserFormValues) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...values } : u));
      message.success('Пользователь обновлен');
    } else {
      const newId = Math.max(...users.map(u => u.id), 0) + 1;
      setUsers([...users, { key: String(newId), id: newId, ...values, registrationDate: new Date().toISOString().split('T')[0] }]);
      message.success('Пользователь добавлен');
    }
    setModalVisible(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={2}>Управление пользователями</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Добавить пользователя
        </Button>
      </div>

      <Table columns={columns} dataSource={users} />

      <Modal
        title={editingUser ? 'Редактирование пользователя' : 'Добавление пользователя'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Роль" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Client">Клиент</Select.Option>
              <Select.Option value="Photographer">Фотограф</Select.Option>
              <Select.Option value="Admin">Администратор</Select.Option>
            </Select>
          </Form.Item>
          {!editingUser && (
            <Form.Item name="password" label="Пароль" rules={[{ required: true, min: 6 }]}>
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;