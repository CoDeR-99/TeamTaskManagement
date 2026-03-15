import { useEffect } from "react";
import { message } from "antd";

interface MessageProps {
  status: "success" | "error" | "info" | "warning";
  message: string;
}

const Message: React.FC<MessageProps> = ({ status, message: text }) => {
  const [messageApi, contextHolder] = message.useMessage();
//   messageApi[status](text); // messageApi.success('Message') OR messageApi.error('Message')

  useEffect(() => {
    if (text) {
      messageApi[status](text);
    }
  }, [status, text, messageApi]);

  return <>{contextHolder}</>;
};

export default Message;