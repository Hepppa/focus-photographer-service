import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Tabs, Button, Modal, message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title } = Typography;
import { Typography } from 'antd';

interface GalleryItem {
  id: number;
  url: string;
  category: string;
  title: string;
}

const PortfolioPage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const stats = {
    newOrders: 3,
    confirmations: 2,
    completedThisMonth: 12,
    revenueThisMonth: 45000,
  };

  const gallery: GalleryItem[] = [
    { id: 1, url: 'https://via.placeholder.com/300x200', category: 'Портрет', title: 'Портретная съемка' },
    { id: 2, url: 'https://via.placeholder.com/300x200', category: 'Семья', title: 'Семейная фотосессия' },
    { id: 3, url: 'https://via.placeholder.com/300x200', category: 'Бизнес', title: 'Бизнес-портрет' },
    { id: 4, url: 'https://via.placeholder.com/300x200', category: 'Спорт', title: 'Спортивная съемка' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('Все');
  const categories = ['Все', 'Портрет', 'Семья', 'Бизнес', 'Спорт', 'Свадьба'];

  const filteredGallery = selectedCategory === 'Все' 
    ? gallery 
    : gallery.filter(item => item.category === selectedCategory);

  const handleUpload = () => {
    message.success('Фото успешно загружено');
    setFileList([]);
  };

  const handlePreview = (url: string) => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Title level={2}>Портфолио</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Новые заказы" value={stats.newOrders} valueStyle={{ color: '#1890ff' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Подтверждение" value={stats.confirmations} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Выполнено за месяц" value={stats.completedThisMonth} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Доход за месяц" value={stats.revenueThisMonth} prefix="₽" />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>Прикрепить фото</Title>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={() => false}
        >
          {fileList.length < 10 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Загрузить</div></div>}
        </Upload>
        <Button type="primary" onClick={handleUpload} style={{ marginTop: 16 }}>
          Сохранить
        </Button>
      </Card>

      <Card>
        <Tabs
          activeKey={selectedCategory}
          onChange={setSelectedCategory}
          items={categories.map(cat => ({
            key: cat,
            label: cat,
          }))}
        />
        <Row gutter={[16, 16]}>
          {filteredGallery.map(item => (
            <Col xs={12} sm={8} md={6} key={item.id}>
              <Card
                hoverable
                cover={<img alt={item.title} src={item.url} style={{ height: 150, objectFit: 'cover' }} onClick={() => handlePreview(item.url)} />}
              >
                <Card.Meta title={item.title} description={item.category} />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default PortfolioPage;