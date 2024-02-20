function getEdges(first, last, closest) {
  let start = null;
  let end = null;
  for (let i = 0; i < closest.length; i++) {
    if (closest.item(i) === first.node) start = i;
    else if (closest.item(i) === last.node) end = i;
  }
  return [start, end];
}