function modelName(model) {
  let name = '<Unknown model>';
  if (model.toString) {
    name = model.toString();
  }

  if (name.length > 50) {
    name = `${name.substr(0, 50)}...`;
  }
  return name;
}