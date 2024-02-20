function format_input(field, obj) {
  for (let key in obj[field]) {
    let k = field +'['+ key +']';
    obj[k] = obj[field][key];
  }
  return obj;
}