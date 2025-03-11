import { Book } from '@/types';
import {
  Form,
  Input,
  message,
  Modal,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import CoverUpload from './CoverUpload';
import {
  detailBook,
  updateBook,
} from '@/api/book';
import { useEffect } from 'react';

interface UpdateBookModalProps {
  id: number;
  isOpen: boolean;
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

export interface UpdateBook extends Book {}

export default function UpdateBookModal(
  props: UpdateBookModalProps,
) {
  const [form] = useForm<UpdateBook>();
  const handleOk = async function () {
    await form.validateFields();
    const values = form.getFieldsValue();

    try {
      const res = await updateBook({
        ...values,
        id: props.id,
      });
      message.success('update book success');
      handleCancel();
    } catch (e: any) {
      // message.error(e.response.data.message);
      console.error(e);
    }
  };

  async function query() {
    if (!props.id) {
      return;
    }
    try {
      const res = await detailBook(props.id);
      const { data } = res;
      form.setFieldsValue(data);
    } catch (err: any) {
      message.error(err.response.data.message);
    }
  }

  const handleCancel = () => {
    form.resetFields();
    props.handleClose();
  };

  useEffect(() => {
    query();
  }, [props.id]);

  return (
    <Modal
      title="update book"
      open={props.isOpen}
      onOk={handleOk}
      onCancel={() => props.handleClose()}
      okText={'update'}
      cancelText={'cancel update'}
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label={'book name'}
          name="name"
          rules={[
            {
              required: true,
              message: 'book name is required',
            },
          ]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label={'author'}
          name="author"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label={'description'}
          name="description"
          rules={[
            {
              required: true,
              message: 'description is required',
            },
          ]}
        >
          <TextArea></TextArea>
        </Form.Item>

        <Form.Item
          label={'cover'}
          name="cover"
          rules={[
            {
              required: true,
              message: 'cover is required',
            },
          ]}
        >
          <CoverUpload></CoverUpload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
