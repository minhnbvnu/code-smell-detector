function findbacon() {
  // Clear everyone from having been searched
  graph.clear();
  // Start and end
  var start = actors[actorlist.value()];
  var end = actors['Kevin Bacon'];
  graph.setStart(start);
  graph.setEnd(end);
  // Run the search!
  bfs();
}