function handleRgb(stack, data) {
  data = data.substring(2).slice(0, -1);
  var operation = +data.substr(0, 2);
  var color = data.substring(5).split(';');
  var rgb = color.map(function (value) {
    return ('0' + Number(value).toString(16)).substr(-2);
  }).join('');
  return pushStyle(stack, (operation === 38 ? 'color:#' : 'background-color:#') + rgb);
}