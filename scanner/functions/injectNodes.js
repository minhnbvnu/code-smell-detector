function injectNodes(startNode) {
  const endNode = startNode.next;

  const start = startNode.point;
  const end = startNode.next.point;
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];

  // first point at 1/3 along the segment
  const firstNode = {
    point: [start[0] + dx / 3, start[1] + dy / 3],
  };

  // second point at peak of _/\_
  const r = Math.sqrt(dx * dx + dy * dy) / (2 * cos30);
  const a = Math.atan2(dy, dx) + Math.PI / 6;
  const secondNode = {
    point: [start[0] + r * Math.cos(a), start[1] + r * Math.sin(a)],
  };

  // third point at 2/3 along the segment
  const thirdNode = {
    point: [end[0] - dx / 3, end[1] - dy / 3],
  };

  startNode.next = firstNode;
  firstNode.next = secondNode;
  secondNode.next = thirdNode;
  thirdNode.next = endNode;
}