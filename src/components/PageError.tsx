import React from 'react';
import { Alert, Button, Space } from 'antd';

interface PageErrorProps {
  error?: string | Error;
  onRetry?: () => void;
}

const PageError: React.FC<PageErrorProps> = ({ error, onRetry }) => {
  const errorMessage = error instanceof Error ? error.message : error || 'Произошла ошибка';

  return (
    <div style={{ padding: 24 }}>
      <Alert
        message="Ошибка"
        description={errorMessage}
        type="error"
        showIcon
        action={
          onRetry && (
            <Space>
              <Button size="small" type="primary" onClick={onRetry}>
                Повторить
              </Button>
            </Space>
          )
        }
      />
    </div>
  );
};

export default PageError;