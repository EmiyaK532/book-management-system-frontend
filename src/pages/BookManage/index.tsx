/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Form, Input } from 'antd';
import '../../index.css';

const BookManage = () => {
  return (
    <div id="bookManage">
      <h1>book management</h1>
      <div className="content">
        <div className="book-search">
          <Form
            name="search"
            layout="inline"
            colon={false}
          >
            <Form.Item
              label="图标名称"
              name="name"
            >
              <Input />
            </Form.Item>

            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
              >
                搜索图书
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: 'green' }}
              >
                添加图书
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="book-list">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => {
            return (
              <Card
                className="card"
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  ></img>
                }
              >
                <h2>Hello World</h2>
                <div>kami</div>
                <div className="links">
                  <a href="#">详情</a>
                  <a href="#">编辑</a>
                  <a href="#">删除</a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookManage;
