import {
  Form,
  Input,
  message,
  Modal,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { createBooks } from '../../api/book';
import CoverUpload from './CoverUpload';

interface CreateBookModalProps {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  handleClose: Function;
  reload: string;
  setReload: Function;
}

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

export interface CreateBook {
  name: string;
  author: string;
  description: string;
  cover: string;
}

const CreateBookModal = (
  props: CreateBookModalProps,
) => {
  const [form] = useForm<CreateBook>();
  const handleOk = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    try {
      const res = await createBooks(values);
      message.success('创建图书成功');
      form.resetFields();
      props.handleClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      message.error(err.response.data.message);
    }
  };

  return (
    <Modal
      title="新增图书"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => {
        props.handleClose();
      }}
      okText="创建"
      cancelText="取消创建"
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label="书名"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入书名',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作者"
          name="author"
          rules={[
            {
              required: true,
              message: '请输入作者',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="描述"
          name="description"
          rules={[
            {
              required: true,
              message: '请输入图书描述',
            },
          ]}
        >
          <TextArea></TextArea>
        </Form.Item>

        <Form.Item
          label="封面"
          name="cover"
          rules={[
            {
              required: true,
              message: '请上传图书封面!',
            },
          ]}
        >
          <CoverUpload></CoverUpload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBookModal;
