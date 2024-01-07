function getNearestRadialItems(chart, position, axis, useFinalPosition) {
  let items = [];

  function evaluationFunc(element, datasetIndex, index) {
    const {startAngle, endAngle} = element.getProps(['startAngle', 'endAngle'], useFinalPosition);
    const {angle} = getAngleFromPoint(element, {x: position.x, y: position.y});

    if (_angleBetween(angle, startAngle, endAngle)) {
      items.push({element, datasetIndex, index});
    }
  }

  evaluateInteractionItems(chart, axis, position, evaluationFunc);
  return items;
}