function isNotOverlapped(item, area) {
  if (!area) {
    return true;
  }
  const {left, top, right, bottom} = item;
  const apexesInArea = _isPointInArea({x: left, y: top}, area) || _isPointInArea({x: left, y: bottom}, area) ||
    _isPointInArea({x: right, y: top}, area) || _isPointInArea({x: right, y: bottom}, area);
  return !apexesInArea;
}