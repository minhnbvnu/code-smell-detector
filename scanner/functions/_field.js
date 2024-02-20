function _field(name, type, required = false) {
  return {
    'attrs': [],
    'fieldName': {
      'lexeme': name,
      'tag': Tag.ID,
    },
    'fieldValue': {
      'fieldType': type,
      'type': 'fieldType'
    },
    'required': required,
    'type': 'modelField'
  };
}