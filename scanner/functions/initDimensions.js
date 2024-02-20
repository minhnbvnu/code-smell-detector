function initDimensions() {
      //Height and width have four 'modes':
      //1) Computed Mode
      //  - Nothing is supplied, so we getComputedStyle() on one element in the list and use
      //    that width and height value for the width and height of every item. This is re-computed
      //    every resize.
      //2) Constant Mode, Static Integer
      //  - The user provides a constant number for width or height, in pixels. We parse it,
      //    store it on the `value` field, and it never changes
      //3) Constant Mode, Percent
      //  - The user provides a percent string for width or height. The getter for percent is
      //    stored on the `getValue()` field, and is re-evaluated once every resize. The result
      //    is stored on the `value` field.
      //4) Dynamic Mode
      //  - The user provides a dynamic expression for the width or height.  This is re-evaluated
      //    for every item, stored on the `.getValue()` field.
      if (heightExpr) {
        parseDimensionAttr(heightExpr, heightData);
      } else {
        heightData.computed = true;
      }
      if (widthExpr) {
        parseDimensionAttr(widthExpr, widthData);
      } else {
        widthData.computed = true;
      }
    }