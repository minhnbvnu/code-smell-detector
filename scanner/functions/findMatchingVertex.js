function findMatchingVertex(vertex, others) {
  return others.find( otherVertex => otherVertex.get('id') === vertex.get('id') );
}