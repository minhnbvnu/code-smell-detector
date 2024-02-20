function createGraphSet(gridSize, wallFrequency) {
  var graphSet = [];
  for(var x=0;x<gridSize;x++) {
    var row = [];
    for(var y=0;y<gridSize;y++) {
      // maybe set this node to be wall
      var rand = Math.floor(Math.random()*(1/wallFrequency));
      row.push(new GraphNode(x,y,(rand == 0)));
    }
    graphSet.push(row);
  }
  return graphSet;
}