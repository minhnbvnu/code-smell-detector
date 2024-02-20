function valueInViewScope(node, value, tag) {
    var min, max;
    var pos = getPosition(node);
    viewScope = {
      start: {
        left: pos.left,
        top: pos.top
      },
      end: {
        left: pos.left + node.clientWidth,
        top: pos.top + node.clientHeight
      }
    };
    var str = tag == 1 ? 'left' : 'top';
    min = viewScope.start[str];
    max = viewScope.end[str];
    return value >= min && value <= max;
  }