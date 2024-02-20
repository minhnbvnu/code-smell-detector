function handleSchema(schema) {
  if(schema && !schema.type && !schema.properties){
    schema.type = 'string';
  }
  handleType(schema)
  if (schema.type === "object") {
    if(!schema.properties)schema.properties = {}
    handleObject(schema.properties, schema);
  }else if (schema.type === "array") {
    if(!schema.items)schema.items = {type: 'string'}
    handleSchema(schema.items);
  }else{
    return schema
  }
}