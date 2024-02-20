function updatePropertyOn(obj, path, value) {
  if (typeof path === 'string') {
    path = path.split('.');
  }

  var next = path[0];

  if (obj.hasOwnProperty(next)) {
    if (path.length === 1) {
      obj[next] = value;
    } else {
      updatePropertyOn(obj[next], path.slice(1), value);
    }
  }
}