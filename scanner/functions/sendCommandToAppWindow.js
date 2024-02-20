function sendCommandToAppWindow(name, data) {
  if (data instanceof Error) {
    console.error(data);
    data = data.toString();
  }
  process.send({
    event: name,
    data: data
  });
}