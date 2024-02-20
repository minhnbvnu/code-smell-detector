function setList(key, list) {
  var models = [];
  for(var i in list) {
    var model = new Post(list[i]);
    models.push(model);
  }
  _hash[key] = models;
}