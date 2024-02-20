function validateUIBuilderOutput(results) {
  for (const name in results) {
    if (results.hasOwnProperty(name)) {
      schemaValidator.validate('declarative-ui/panel', results[name]);
    }
  }
}