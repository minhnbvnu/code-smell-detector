function addModel(key, props) {
  if(!_hash[key]) _hash[key] = [];
  var model = new Post(props);
  _hash[key].unshift(model);
}