import React from "react";
import {
  Button,
  Row,
  Col,
  Input,
  PageHeader,
  Divider,
  List,
  Typography,
  Space,
} from "antd";
const { Title, Text } = Typography;
const { TextArea } = Input;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 0,
      width: 0,
      currentMenuItem: "1",
      completed: [],
      todo: [],
      temptitle: "",
      tempdesc: "",
    };
    window.addEventListener("resize", this.update);
  }
  componentDidMount() {
    this.update();
    this.getComplete();
    this.getTodos();
  }

  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  async getComplete() {
    const response = await fetch("http://127.0.0.1:9505/getComplete");
    const data = await response.json();
    console.log(data);
    this.setState({ completed: data });
  }

  async getTodos() {
    const response = await fetch("http://127.0.0.1:9505/getTodos");
    const data = await response.json();
    this.setState({ todo: data });
  }

  async postTodo(todo) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    };
    const response = await fetch(
      "http://127.0.0.1:9505/postNewTodo",
      requestOptions
    );
    const data = await response.json();
    console.log(data);

    this.getTodos();
    this.getComplete();
  }

  render() {
    return (
      <div>
        <div style={{ paddingTop: 12, paddingRight: 12, paddingLeft: 12 , backgroundColor: "#f5f5f5", marginBottom: this.state.height*0.04 }}>
          <PageHeader
            title={<Title>Radiant</Title>}
            subTitle="A Simple To-Do List"
            extra={[
              <Text type="secondary">Author: Mohit Bhole</Text>,
              <Button key="3" type="link">
                My Github
              </Button>,
              <Button key="4" type="link">
                My Portfolio
              </Button>,
            ]}
          />
        </div>

        {this.state.width >= this.state.height ? (
          //Desktop Orientation
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Space direction="vertical" style={{ width: "80%" }}>
                <Title level={2}>Create a new task</Title>
                <Input
                  placeholder="Name your task"
                  value={this.state.temptitle}
                  onChange={(e) => {
                    this.setState({ temptitle: e.target.value });
                  }}
                ></Input>
                <TextArea
                  autoSize={{ minRows: 4, maxRows: 10 }}
                  placeholder="Describe your task"
                  value={this.state.tempdesc}
                  onChange={(e) => {
                    this.setState({ tempdesc: e.target.value });
                  }}
                ></TextArea>
                <Space>
                  <Button
                    onClick={() => {
                      if (this.state.temptitle) {
                        this.postTodo({
                          id: Math.random().toString(36).slice(2),
                          title: this.state.temptitle,
                          description: this.state.tempdesc
                            ? this.state.tempdesc
                            : "",
                          complete: 0,
                        });
                        this.setState({ tempdesc: "", temptitle: "" });
                      }
                    }}
                    type="primary"
                  >
                    Add task
                  </Button>
                </Space>
                <Divider></Divider>
                <Title level={2}>Completed tasks</Title>
                <List
                  size="large"
                  bordered
                  dataSource={this.state.completed}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.title}
                        description={item.description}
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
                  dataSource={this.state.todo}
                  renderItem={(item) => (
                    <List.Item
                      extra={
                        <Button
                          onClick={() => {
                            this.postTodo({
                              id: item.id,
                              title: item.title,
                              description: item.description
                                ? item.description
                                : "",
                              complete: 1,
                            });
                          }}
                        >
                          Done
                        </Button>
                      }
                    >
                      <List.Item.Meta
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Space>
            </Col>
          </Row>
        ) : (
          //Mobile Orientation
          <div>
            <Space direction="vertical" style={{ width: "80%" }}>
              <Title level={2}>Create a new task</Title>
              <Input
                placeholder="Name your task"
                value={this.state.temptitle}
                onChange={(e) => {
                  this.setState({ temptitle: e.target.value });
                }}
              ></Input>
              <TextArea
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder="Describe your task"
                value={this.state.tempdesc}
                onChange={(e) => {
                  this.setState({ tempdesc: e.target.value });
                }}
              ></TextArea>
              <Space>
                <Button
                  onClick={() => {
                    if (this.state.temptitle) {
                      this.postTodo({
                        id: Math.random().toString(36).slice(2),
                        title: this.state.temptitle,
                        description: this.state.tempdesc
                          ? this.state.tempdesc
                          : "",
                        complete: 0,
                      });
                      this.setState({ tempdesc: "", temptitle: "" });
                    }
                  }}
                  type="primary"
                >
                  Add task
                </Button>
              </Space>
              <Divider></Divider>
              <Space direction="vertical" style={{ width: "80%" }}>
                <Title level={2}>To-Do List</Title>
                <List
                  size="large"
                  bordered
                  dataSource={this.state.todo}
                  renderItem={(item) => (
                    <List.Item
                      extra={
                        <Button
                          onClick={() => {
                            this.postTodo({
                              id: item.id,
                              title: item.title,
                              description: item.description
                                ? item.description
                                : "",
                              complete: 1,
                            });
                          }}
                        >
                          Done
                        </Button>
                      }
                    >
                      <List.Item.Meta
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Space>
              <Divider></Divider>
              <Title level={2}>Completed tasks</Title>
              <List
                size="large"
                bordered
                dataSource={this.state.completed}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Space>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
