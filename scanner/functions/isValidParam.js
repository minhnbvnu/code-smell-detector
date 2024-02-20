function isValidParam({ type }) {
  return ['number', 'boolean', 'string', 'param'].includes(type);
}