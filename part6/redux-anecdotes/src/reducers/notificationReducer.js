const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    case "REMOVE_NOTIFICATION":
      return (action.notification = "");

    default:
      return state;
  }
};

export const notificationChange = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    notification,
  };
};

export const notificationRemove = {
  type: "REMOVE_NOTIFICATION",
};

export default notificationReducer;
