function noOpClientMethods() {
  return c.v2Methods.reduce((client, method) => {
    client[method] = () => {};
    return client;
  }, {});
}