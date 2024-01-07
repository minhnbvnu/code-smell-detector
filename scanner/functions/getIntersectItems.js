function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
  const items = [];

  if (!includeInvisible && !chart.isPointInArea(position)) {
    return items;
  }

  const evaluationFunc = function(element, datasetIndex, index) {
    if (!includeInvisible && !_isPointInArea(element, chart.chartArea, 0)) {
      return;
    }
    if (element.inRange(position.x, position.y, useFinalPosition)) {
      items.push({element, datasetIndex, index});
    }
  };

  evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
  return items;
}