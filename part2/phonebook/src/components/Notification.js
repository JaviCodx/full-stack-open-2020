const Notification = ({ message }) => {
  if (message.length === 0) {
    return null;
  }

  const isSuccess = message[0];
  const text = message[1];

  return <div className={isSuccess ? "success" : "error"}>{text}</div>;
};

export default Notification;
