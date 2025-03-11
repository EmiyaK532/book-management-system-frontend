/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Popconfirm,
} from 'antd';
import '../../index.css';

import { Book } from '@/types';
import { useEffect, useState } from 'react';
import {
  deleteBook,
  getBookList,
} from '@/api/book';
import CreateBookModal from './CreateBookModal';
import UpdateBookModal from './UpdateBookModal';

const BookManage = () => {
  // 图书列表
  const [books, setBooks] = useState<Array<Book>>(
    [],
  );
  // 图书名称(搜索使用)
  const [name, setName] = useState<string>('');
  // 创建图书弹窗
  const [
    isCreateBookModalOpen,
    setCreateBookModalOpen,
  ] = useState<boolean>(false);
  // 更新图书弹窗
  const [
    isUpdateBookModalOpen,
    setUpdateBookModalOpen,
  ] = useState<boolean>(false);
  // 更新图书id
  const [updateId, setUpdateId] =
    useState<number>(0);
  //更新和创建成功响应式更新state
  const [reload, setReload] =
    useState<string>('1');

  // 获取图书列表
  async function fetchBooks() {
    try {
      const res = await getBookList(name);
      message.success('获取图书列表成功');
      setBooks(res.data);
    } catch (err) {
      message.error('获取图书列表失败');
    }
  }

  const searchBooks = async (value: {
    name: string;
  }) => {
    setName(value.name);
  };

  // 删除图书
  async function handleDeleteBook(id: number) {
    try {
      const res = await deleteBook(id);
      message.success('删除图书成功');
      setReload(new Date().getTime().toString());
    } catch (err) {
      message.error('删除图书失败');
    }
  }

  // 获取图书列表
  useEffect(() => {
    fetchBooks();
    // console.log(name);
  }, [name, reload]);

  return (
    <div id="bookManage">
      {/* 创建图书弹窗 */}
      <CreateBookModal
        isOpen={isCreateBookModalOpen}
        handleClose={() => {
          setName('');
          setCreateBookModalOpen(false);
        }}
        reload={reload}
        setReload={setReload}
      ></CreateBookModal>

      {/* 更新图书弹窗 */}
      <UpdateBookModal
        isOpen={isUpdateBookModalOpen}
        handleClose={() => {
          setUpdateBookModalOpen(false);
          setName('');
        }}
        id={updateId}
        reload={reload}
        setReload={setReload}
      ></UpdateBookModal>

      {/* 图书管理标题 */}
      <h1>book management</h1>
      {/* 图书管理内容 */}
      <div className="content">
        {/* 图书搜索 */}
        <div className="book-search">
          <Form
            name="search"
            layout="inline"
            colon={false}
            onFinish={searchBooks}
          >
            <Form.Item
              label="图书名称"
              name="name"
            >
              <Input />
            </Form.Item>

            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '10px' }}
              >
                搜索图书
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: 'green' }}
                onClick={() => {
                  setCreateBookModalOpen(true);
                }}
              >
                添加图书
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* 图书列表 */}
        <div className="book-list">
          {books.map((book) => {
            return (
              <Card
                className="card"
                hoverable
                style={{
                  width: 300,
                  overflow: 'hidden',
                }}
                cover={
                  <div
                    style={{
                      height: 300,
                      width: 300,
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      alt="example"
                      src={`http://localhost:3000/${book.cover}`}
                      style={{
                        height: 300,
                        width: 'auto',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    ></img>
                  </div>
                }
              >
                <h2>{book.name}</h2>
                <div className="author">
                  {book.author}
                </div>
                <div className="links">
                  <a href="#">详情</a>
                  <a
                    href="#"
                    onClick={() => {
                      setUpdateId(book.id);
                      setUpdateBookModalOpen(
                        true,
                      );
                    }}
                  >
                    编辑
                  </a>
                  <Popconfirm
                    title="图书删除"
                    description="确定删除该图书吗？"
                    onConfirm={() => {
                      handleDeleteBook(book.id);
                      console.log('删除');
                    }}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a href="#">删除</a>
                  </Popconfirm>
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
