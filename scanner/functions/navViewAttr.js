function navViewAttr(ele, value) {
    if (arguments.length > 1) {
      cachedAttr(ele, NAV_VIEW_ATTR, value);
    } else {
      return cachedAttr(ele, NAV_VIEW_ATTR);
    }
  }