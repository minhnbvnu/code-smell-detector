function _mapfield(name, keyType, valueType, required = false) {
  return {
    'attrs': [],
    'fieldName': {
      'lexeme': name,
      'tag': Tag.ID,
    },
    'fieldValue': {
      'fieldType': 'map',
      'type': 'fieldType',
      'keyType': {
        'lexeme': keyType,
        'tag': Tag.TYPE
      },
      'valueType': {
        'lexeme': valueType,
        'tag': Tag.TYPE
      }
    },
    'required': required,
    'type': 'modelField'
  };
}