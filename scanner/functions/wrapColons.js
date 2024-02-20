function wrapColons (str) {
  return (typeof str === 'string' && str.length > 0) ? ':' + str + ':' : str;
}