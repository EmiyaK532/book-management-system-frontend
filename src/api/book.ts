import { UpdateBook } from '@/pages/BookManage/UpdateBookModal';
import { CreateBook } from '../pages/BookManage/CreateBookModal';
import axiosInstance from '../utils/request';

// 获取图书列表
export async function getBookList(name: string) {
  return await axiosInstance.get('/book/list', {
    params: {
      name,
    },
  });
}

// 创建图书
export async function createBooks(
  book: CreateBook,
) {
  return await axiosInstance.post(
    '/book/create',
    {
      ...book,
    },
  );
}

// 获取图书详情
export async function detailBook(id: number) {
  return await axiosInstance.get(`/book/${id}`);
}

// 更新图书
export async function updateBook(
  book: UpdateBook,
) {
  //优化请求体写法
  return await axiosInstance.put('/book/update', {
    ...book,
    // id: book.id,
    // name: book.name,
    // author: book.author,
    // description: book.description,
    // cover: book.cover,
  });
}

// 删除图书
export async function deleteBook(id: number) {
  return await axiosInstance.delete(
    `/book/delete/${id}`,
  );
}
