import React from 'react';
import { Empty } from 'antd';

interface PageEmptyProps {
  title?: string;
  description?: string;
}

const PageEmpty: React.FC<PageEmptyProps> = ({ 
  title = 'Нет данных', 
  description = 'Записи отсутствуют' 
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
      <Empty description={<span>{title}<br /><small>{description}</small></span>} />
    </div>
  );
};

export default PageEmpty;