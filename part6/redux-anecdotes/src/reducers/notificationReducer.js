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

export const notificationChange = (notification, duration) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification,
    });

    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
      });
    }, duration * 1000);
  };
};

export default notificationReducer;
