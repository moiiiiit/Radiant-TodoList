import React from "react";
import {
  Button,
  Row,
  Col,
  DatePicker,
  Input,
  PageHeader,
  Divider,
  Calendar,
  Card,
  List,
  Typography,
  Space,
  Avatar,
  Menu,
} from "antd";
import Logo from "../assets/logo.jpg";
const { Title, Text } = Typography;
const { TextArea } = Input;
const { SubMenu } = Menu;
const completed = [
  {
    time: "3:00pm",
    title: "Title 1",
    desc: "Hi",
  },
  {
    time: "3:00pm",
    title: "Title 2",
    desc: "Hi",
  },
];
const todo = [
  {
    time: "3:00pm",
    title: "Title 1",
    desc: "Hi",
  },
  {
    time: "3:00pm",
    title: "Title 2",
    desc: "Hi",
  },
];

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 0,
      width: 0,
      currentMenuItem: "1",
    };
    window.addEventListener("resize", this.update);
  }
  componentDidMount() {
    this.update();
  }

  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };
  render() {
    return (
      <div>
        <PageHeader
          title={<Title>Radiant</Title>}
          subTitle="A Simple To-Do List"
          extra={[
            <Text type="secondary">Author: Mohit Bhole</Text>,
            <Button key="3" type="link">My Github</Button>,
            <Button key="4" type="link">My Portfolio</Button>,
          ]}
        />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Space direction="vertical" style={{ width: "80%" }}>
              <Title level={2}>Create a new task</Title>
              <Input placeholder="Name your task"></Input>
              <TextArea
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder="Describe your task"
              ></TextArea>
              <Space>
                <DatePicker showTime></DatePicker>
                <Button type="primary">Add task</Button>
              </Space>
              <Divider></Divider>
              <Title level={2}>Completed tasks</Title>
              <List
                size="large"
                bordered
                dataSource={completed}
                renderItem={(item) => (
                  <List.Item extra={<Button>Done</Button>}>
                    <List.Item.Meta
                      title={item.time + " - " + item.title}
                      description={item.desc}
                    />
                  </List.Item>
                )}
              />
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" style={{ width: "80%" }}>
              <Title level={2}>To-Do List</Title>
              <List
                size="large"
                bordered
                dataSource={todo}
                renderItem={(item) => (
                  <List.Item extra={<Button>Done</Button>}>
                    <List.Item.Meta
                      title={item.time + " - " + item.title}
                      description={item.desc}
                    />
                  </List.Item>
                )}
              />
            </Space>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
