function positionScrollbars(element, width, height) {
        var expand = getExpandElement(element);
        var shrink = getShrinkElement(element);
        var expandWidth = getExpandWidth(width);
        var expandHeight = getExpandHeight(height);
        var shrinkWidth = getShrinkWidth(width);
        var shrinkHeight = getShrinkHeight(height);
        expand.scrollLeft = expandWidth;
        expand.scrollTop = expandHeight;
        shrink.scrollLeft = shrinkWidth;
        shrink.scrollTop = shrinkHeight;
      }