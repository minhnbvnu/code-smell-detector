function itemIsVisible(item) {
    if (item.hidden || item.guides || item.typename == "GroupItem") return false;
    return testBoundsIntersection(item.visibleBounds, ab.artboardRect);
  }