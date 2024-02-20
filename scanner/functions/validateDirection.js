function validateDirection(direction) {
    if (direction != 'horizontal' && direction != 'vertical') {
      throw new TypeError('Unknown direction "' + direction + '". ' + 'Choose "horizontal" or "vertical".');
    }
  }