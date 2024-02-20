async function* accumulateQuery(queryRequest) {
  let then = performance.now();
  const queryResponse = await queryRequest;
  const values = [];
  values.done = false;
  values.error = null;
  values.schema = queryResponse.schema;
  try {
    for await (const rows of queryResponse.readRows()) {
      if (performance.now() - then > 150 && values.length > 0) {
        yield values;
        then = performance.now();
      }
      for (const value of rows) {
        values.push(value);
      }
    }
    values.done = true;
    yield values;
  } catch (error) {
    values.error = error;
    yield values;
  }
}