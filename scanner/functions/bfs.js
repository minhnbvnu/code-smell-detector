function bfs() {
  // Create a queue ad path
  var queue = [];
  var path = [];

  // Get started
  queue.push(graph.start);

  while (queue.length > 0) {
    var node = queue.shift();
    // Are we done?
    if (node == graph.end) {
      // Figure out the path
      path.push(node);
      var next = node.parent;
      while (next) {
        path.push(next);
        next = next.parent;
      }
      break;
    } else {
      // Check all neighbors
      var next = node.edges;
      for (var i = 0; i < next.length; i++) {
        var neighbor = next[i];
        // Any neighbor not already searched add to queue
        if (!neighbor.searched) {
          queue.push(neighbor);
          // Updat the parent
          neighbor.parent = node;
        }
      }
      // Mark node as searched
      node.searched = true;
    }
  }

  console.log('-------finished-----')
  var result = '';
  for (var i = path.length-1; i >= 0; i--) {
    result += path[i].label;
    if (i != 0) {
      result += ' → ';
    }
    console.log(path[i].label);
  }
  createP(result);


}