function animationValues(strValues, i) {
    var values = strValues.split(';');
    var back = values.slice(i);
    var front = values.slice(0, values.length - back.length);
    values = back.concat(front).reverse();
    return values.join(';') + ';' + values[0];
  }