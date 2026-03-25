import React, { useState } from 'react';
import { Table, Tag, Button, Space, Typography, Card, Row, Col, Statistic, Modal, message, Upload } from 'antd';
import { CheckOutlined, CloseOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title } = Typography;

interface Booking {
  key: string;
  date: string;
  time: string;
  client: string;
  service: string;
  price: number;
  status: 'Новый' | 'Подтвержден' | 'Выполнен' | 'Отклонен';
}

const PhotographerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const bookings: Booking[] = [
    { key: '1', date: '2026-03-10', time: '10:00 - 13:00', client: 'Екатерина Иванова', service: 'Свадебная съемка', price: 25000, status: 'Новый' },
    { key: '2', date: '2026-03-12', time: '09:00 - 13:00', client: 'Михаил Петров', service: 'Портретная съемка', price: 5000, status: 'Новый' },
    { key: '3', date: '2026-03-11', time: '12:00 - 13:30', client: 'Ольга Смирнова', service: 'Семейная съемка', price: 7000, status: 'Подтвержден' },
    { key: '4', date: '2026-02-20', time: '11:00 - 13:00', client: 'Анна Кузнецова', service: 'Love Story', price: 10000, status: 'Выполнен' },
    { key: '5', date: '2026-02-15', time: '10:00 - 13:30', client: 'Дмитрий Соколов', service: 'Бизнес-портрет', price: 5000, status: 'Выполнен' },
    { key: '6', date: '2026-02-10', time: '15:00 - 16:00', client: 'Виктор Морозов', service: 'Детская съемка', price: 4000, status: 'Выполнен' },
    { key: '7', date: '2026-03-27', time: '19:00 - 20:00', client: 'Ирина Волкова', service: 'Предметная съемка', price: 3500, status: 'Новый' },
  ];

  const statusCounts = {
    waiting: bookings.filter(b => b.status === 'Новый').length,
    approved: bookings.filter(b => b.status === 'Подтвержден').length,
    completed: bookings.filter(b => b.status === 'Выполнен').length,
  };

  const handleApprove = (record: Booking) => {
    message.success(`Заказ от ${record.client} одобрен`);
  };

  const handleReject = (record: Booking) => {
    message.warning(`Заказ от ${record.client} отклонен`);
  };

  const handleUploadPhotos = (record: Booking) => {
    setCurrentBooking(record);
    setModalVisible(true);
  };

  const handleUploadConfirm = () => {
    message.success('Фото успешно загружены');
    setModalVisible(false);
    setFileList([]);
  };

  const columns = [
    { title: 'Дата', dataIndex: 'date', key: 'date', width: 120 },
    { title: 'Время', dataIndex: 'time', key: 'time', width: 120 },
    { title: 'Клиент', dataIndex: 'client', key: 'client' },
    { title: 'Услуга', dataIndex: 'service', key: 'service' },
    { title: 'Стоимость', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()} ₽` },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          'Новый': 'blue',
          'Подтвержден': 'green',
          'Выполнен': 'cyan',
          'Отклонен': 'red',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: Booking) => (
        <Space>
          {record.status === 'Новый' && (
            <>
              <Button type="primary" size="small" icon={<CheckOutlined />} onClick={() => handleApprove(record)}>
                Одобрить
              </Button>
              <Button danger size="small" icon={<CloseOutlined />} onClick={() => handleReject(record)}>
                Отклонить
              </Button>
            </>
          )}
          {record.status === 'Подтвержден' && (
            <Button type="primary" size="small" icon={<UploadOutlined />} onClick={() => handleUploadPhotos(record)}>
              Прикрепить фото
            </Button>
          )}
          <Button size="small" icon={<EyeOutlined />} onClick={() => navigate(`/photographer/booking/${record.key}`)}>
            Детали
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Title level={2}>Мои заказы</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Новые заказы" value={statusCounts.waiting} valueStyle={{ color: '#1890ff' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Подтвержденные" value={statusCounts.approved} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Выполненные" value={statusCounts.completed} valueStyle={{ color: '#13c2c2' }} />
          </Card>
        </Col>
      </Row>

      <Table columns={columns} dataSource={bookings} />

      {/* Модальное окно для загрузки фото */}
      <Modal
        title={`Загрузить фото для заказа от ${currentBooking?.client}`}
        open={modalVisible}
        onOk={handleUploadConfirm}
        onCancel={() => setModalVisible(false)}
        okText="Загрузить"
        cancelText="Отмена"
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={() => false}
        >
          {fileList.length < 10 && '+ Загрузить'}
        </Upload>
        <div style={{ marginTop: 16, color: '#666', fontSize: 12 }}>
          Можно загрузить до 10 фото. Поддерживаются форматы JPG, PNG.
        </div>
      </Modal>
    </div>
  );
};

export default PhotographerDashboardPage;