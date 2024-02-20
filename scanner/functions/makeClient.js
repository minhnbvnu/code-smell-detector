function makeClient(lastEvaluatedKey) {
  let queries = [];
  let response = {
    ...data,
    LastEvaluatedKey: lastEvaluatedKey
      ? lastEvaluatedKey
      : data.LastEvaluatedKey,
  };
  let client = {};
  for (const method of v2Methods) {
    // these methods are not necessary to test
    client[method] = () => {};
  }
  // this method is necessary to test
  client.query = (params) => {
    queries.push(params);
    return {
      promise: async () => response,
    };
  };
  return {
    queries,
    client,
  };
}