function overFlow(node, obj1) {
    var result = 0;
    var isX1In = valueInViewScope(node, obj1.start.left, 1);
    var isX2In = valueInViewScope(node, obj1.end.left, 1);
    var isY1In = valueInViewScope(node, obj1.start.top, 0);
    var isY2In = valueInViewScope(node, obj1.end.top, 0);
    if (isX1In != isX2In && isY1In != isY2In) {
      if (isX1In && isY2In) {
        result = 1;
      } else if (isX1In && isY1In) {
        result = 2;
      } else if (isX2In && isY2In) {
        result = 3;
      } else {
        result = 4;
      }
    } else if (isX1In == isX2In) {
      if (!isY1In && isY2In) {
        result = 5;
      } else if (!isY2In && isY1In) {
        result = 6;
      }
    } else if (isY1In == isY2In) {
      if (!isX1In && isX2In) {
        result = 7;
      } else if (isX1In && !isX2In) {
        result = 8;
      }
    } else if (isY1In == isY2In == isX1In == isX2In) {
      result = 9;
    }
    return result;
  }