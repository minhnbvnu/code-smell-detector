function handleType(schema) {
  if(!schema.type && schema.properties && typeof schema.properties === 'object') {
    
    schema.type = 'object'
  }
}