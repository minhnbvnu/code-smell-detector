function clientWrite(client, data) {
  if (client && client._state === 4) {
    client.write(data);
  }
}