import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Tag, Button, Space, Typography, Timeline, Avatar, Input, Form } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

interface CommentType {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  created: string;
  createdBy: string;
  assignedTo: string | null;
  comments: CommentType[];
}

const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ticket: Ticket = {
    id: id || '1',
    title: 'Не работает фотоаппарат',
    description: 'Камера не включается, при подключении к сети не заряжается',
    status: 'Новая',
    priority: 'Высокий',
    category: 'Оборудование',
    created: '2024-03-15 10:30',
    createdBy: 'Иван Петров',
    assignedTo: null,
    comments: [
      { id: 1, author: 'Иван Петров', text: 'Проблема возникла сегодня утром', date: '2024-03-15 10:31' },
    ],
  };

  const handleSubmitComment = (values: { comment: string }) => {
    console.log('Comment:', values.comment);
  };

  return (
    <div>
      <Space style={{ marginBottom: 24 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Назад
        </Button>
      </Space>

      <Title level={2}>Заявка №{ticket.id}</Title>

      <Card style={{ marginBottom: 24 }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Заголовок" span={2}>{ticket.title}</Descriptions.Item>
          <Descriptions.Item label="Статус">
            <Tag color="blue">{ticket.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Приоритет">
            <Tag color="red">{ticket.priority}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Категория">{ticket.category}</Descriptions.Item>
          <Descriptions.Item label="Создал">{ticket.createdBy}</Descriptions.Item>
          <Descriptions.Item label="Дата создания">{ticket.created}</Descriptions.Item>
          <Descriptions.Item label="Назначено">{ticket.assignedTo || 'Не назначено'}</Descriptions.Item>
          <Descriptions.Item label="Описание" span={2}>{ticket.description}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="История обсуждения" style={{ marginBottom: 24 }}>
        <Timeline>
          {ticket.comments.map(comment => (
            <Timeline.Item key={comment.id}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <Avatar icon={<UserOutlined />} />
                <div>
                  <strong>{comment.author}</strong>
                  <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>{comment.date}</div>
                  <div>{comment.text}</div>
                </div>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>

        <Form onFinish={handleSubmitComment} style={{ marginTop: 24 }}>
          <Form.Item name="comment">
            <TextArea rows={4} placeholder="Напишите комментарий..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TicketDetailPage;