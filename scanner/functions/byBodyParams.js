function byBodyParams(param) {
  return param.in === 'body' || param.in === 'formData';
}