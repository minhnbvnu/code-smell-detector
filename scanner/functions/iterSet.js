function iterSet(data, fn) {
  var index = 0;
  data.forEach(function (item) {
    fn(item, String(index++));
  });
}