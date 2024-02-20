function pathFrom(start, end) {
  var startNodes = start.split(".");
  var endNodes = end.split(".");
  var reverse = startNodes.length > endNodes.length;
  if (reverse) {
    var tmp = startNodes;
    startNodes = endNodes;
    endNodes = tmp;
  }

  var common = _.intersection(endNodes, startNodes);
  var difference = _.difference(endNodes, startNodes);
  difference.splice(0, 0, common.pop());

  var name = common.join(".");
  var path = _.map(difference, function(segment) {
    name = (name ? name + "." : "") + segment;
    return name;
  });
  if (reverse) path.reverse();
  return path;
}