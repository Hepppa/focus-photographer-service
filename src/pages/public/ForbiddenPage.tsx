import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Result
        status="403"
        title="403"
        subTitle="Доступ запрещен. У вас недостаточно прав для просмотра этой страницы."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Вернуться на главную
          </Button>
        }
      />
    </div>
  );
};

export default ForbiddenPage;