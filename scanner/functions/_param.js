function _param(name, type) {
  return {
    'type': 'param',
    'paramName': {
      'tag': 2,
      'lexeme': name
    },
    'paramType': {
      'tag': 8,
      'lexeme': type,
    },
  };
}