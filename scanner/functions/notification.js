function notification(msg, type, duration) {
  const content = addIcon(msg, type);
  Notification.newInstance({}, notification => {
    notification.notice({
      content,
      duration,
    });
  });
}