function HorizontalViewType() {
      this.getItemPrimarySize = widthGetter;
      this.getItemSecondarySize = heightGetter;

      this.getScrollValue = function() {
        return Math.max(0, Math.min(scrollView.__scrollLeft - repeaterBeforeSize,
          scrollView.__maxScrollLeft - repeaterBeforeSize - repeaterAfterSize));
      };

      this.refreshDirection = function() {
        this.scrollPrimarySize = scrollView.__clientWidth;
        this.scrollSecondarySize = scrollView.__clientHeight;

        this.estimatedPrimarySize = estimatedWidth;
        this.estimatedSecondarySize = estimatedHeight;
        this.estimatedItemsAcross = isGridView &&
          Math.floor(scrollView.__clientHeight / estimatedHeight) ||
          1;
      };
    }