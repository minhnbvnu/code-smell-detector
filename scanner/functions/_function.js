function _function(name, returnType, params) {
  return {
    'type': 'function',
    'isStatic': false,
    'isAsync': false,
    'hasThrow': false,
    'functionName': {
      'tag': 2,
      'lexeme': name,
    },
    'params': {
      'type': 'params',
      'params': params
    },
    'returnType': {
      'tag': 8,
      'lexeme': returnType,
    },
    'functionBody': null,
  };
}