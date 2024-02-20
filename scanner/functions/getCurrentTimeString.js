function getCurrentTimeString() {
  const date = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  };
  const timeString = date.toLocaleString('en-US', options);
  return `${timeString}`;
}