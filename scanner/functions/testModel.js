function testModel(model) {
  let isModel = false;
  let error = "";
  try {
    validateModel(model);
    isModel = true;
  } catch (err) {
    error = err.message;
  }
  return [isModel, error];
}