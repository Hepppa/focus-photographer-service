import React from 'react';
import { Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const PageLoading: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
      <Space size="large">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        <span style={{ fontSize: 18 }}>Загрузка...</span>
      </Space>
    </div>
  );
};

export default PageLoading;