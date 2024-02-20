function filterMap(array, filter, callback) {
  var counter = array.length;
  var new_array = [];
  array.forEach(function (item, index) {
    filter(item, function (err, result) {
      if (err) { callback(err); return; }
      new_array[index] = result;
      counter--;
      if (counter === 0) {
        new_array.length = array.length;
        callback(null, new_array.filter(function (item) {
          return typeof item !== 'undefined';
        }));
      }
    });
  });
}