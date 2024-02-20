function getEventXY (e) {
  const el = e.target;
  const box = el.getBoundingClientRect();
  return { x: e.x - box.left, y: e.y - box.top };
}