import React from 'react';
import { Alert } from 'antd';

interface PageValidationProps {
  errors: string[];
}

const PageValidation: React.FC<PageValidationProps> = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div style={{ marginBottom: 24 }}>
      <Alert
        message="Ошибки валидации"
        description={
          <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        }
        type="warning"
        showIcon
      />
    </div>
  );
};

export default PageValidation;