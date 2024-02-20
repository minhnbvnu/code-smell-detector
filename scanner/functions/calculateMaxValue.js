function calculateMaxValue(maximum) {
    var distance = ($attrs.distance || '2.5%').trim();
    var isPercent = distance.indexOf('%') !== -1;
    return isPercent ?
    maximum * (1 - parseFloat(distance) / 100) :
    maximum - parseFloat(distance);
  }