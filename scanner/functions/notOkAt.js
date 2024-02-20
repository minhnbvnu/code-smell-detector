function notOkAt(data, path, message) {
    if(validate(data)) {
      return t.fail('should have failed: ' + message)
    }
    t.deepEqual(validate.errors[0].schemaPath, path, message)
  }