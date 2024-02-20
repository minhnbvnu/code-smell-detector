function validateSchema(data, schema) {
  const checkSchema = ajv.compile(schema)
  return checkSchema(data)
}