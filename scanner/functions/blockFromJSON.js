function blockFromJSON(blockchain, data) {
  return new Block({
    ...data,
    blockchain
  });
}