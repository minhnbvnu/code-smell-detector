function mustachify(array) {
  var newArray = []
  array.forEach(function(item) {
    item = "<li><b>" + item + ":</b> {{" + item + "}}</li>"
    newArray.push(item)
  })
  return newArray
}