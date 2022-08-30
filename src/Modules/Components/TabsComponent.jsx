import { Tabs } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import "../Css/Component.css"

const { TabPane } = Tabs;

const TabsComponent = () => {
  return (
    <Tabs defaultActiveKey="1" centered style={{padding : '10px 30px'}}>
      <TabPane tab="Todo" key="1" >
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Done" key="2">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  );
}

export default TabsComponent;