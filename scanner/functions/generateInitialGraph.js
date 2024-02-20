function generateInitialGraph({ catacombs, graveyard, past, present, future=0 }) {
  let vertices = [];
  let edges = [];

  if ( catacombs ) {
    vertices.push({ id: 'cata', region: CATACOMBS, regionIndex: 1 });
  }
  if ( graveyard ) {
    vertices.push({ id: 'grav', region: GRAVEYARD, regionIndex: 1 });
  }
  if ( past ) {
    vertices.push({ id: 'past', region: PAST, regionIndex: 1 });
  }
  if ( present ) {
    vertices.push({ id: 'pres', region: PRESENT, regionIndex: 1 });
  }

  _.range(future).forEach( (futureVertex, i) => {
    vertices.push({ id: 'fut'+i, region: FUTURE, regionIndex: i });
  });

  // Calculate edges by taking vertices two at a time
  vertices.forEach( (vertex, i) => {
    const regionIndex = regions.indexOf(vertex.region)
    const nextRegion = regions[regionIndex+1];

    if ( !nextRegion ) return;

    const nextVertices = vertices.filter( ({region}) => region === nextRegion );

    nextVertices.forEach( nextVertex => {
      edges.push({ from: vertex.id, to: nextVertex.id });
    });
  });

  return fromJS({ vertices, edges });
}