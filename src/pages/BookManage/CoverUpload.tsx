import { DraggerProps, message } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

interface CoverUploadProps {
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onChange?: Function;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
let onChange: Function;

const props: DraggerProps = {
  name: 'file',
  action: 'http://localhost:3000/book/upload',
  method: 'POST',
  onChange(info) {
    const { status } = info.file;
    if (status === 'done') {
      onChange(info.file.response);
      message.success(
        `${info.file.name} 上传成功`,
      );
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  },
};

const dragger = (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>

    <p className="ant-upload-drag-text">
      点击或拖拽上传
    </p>
  </Dragger>
);

export default function CoverUpload(
  props: CoverUploadProps,
) {
  onChange = props.onChange!;
  useEffect(() => {
    console.log(props.value);
  }, [props.value]);

  return props?.value ? (
    <div>
      <img
        src={
          'http://localhost:3000/' + props.value
        }
        alt="cover"
        width="100"
        height="100"
      />
      {dragger}
    </div>
  ) : (
    <div>{dragger}</div>
  );
}
