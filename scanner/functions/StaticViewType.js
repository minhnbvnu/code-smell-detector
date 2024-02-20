function StaticViewType() {
      this.getContentSize = function() {
        return this.getEstimatedPrimaryPos(data.length - 1) + this.estimatedPrimarySize +
          repeaterBeforeSize + repeaterAfterSize;
      };
      // static view always returns the same object for getDimensions, to avoid memory allocation
      // while scrolling. This could be dangerous if this was a public function, but it's not.
      // Only we use it.
      var dim = {};
      this.getDimensions = function(index) {
        dim.primaryPos = this.getEstimatedPrimaryPos(index);
        dim.secondaryPos = this.getEstimatedSecondaryPos(index);
        dim.primarySize = this.estimatedPrimarySize;
        dim.secondarySize = this.estimatedSecondarySize;
        return dim;
      };
      this.updateRenderRange = function(scrollValue, scrollValueEnd) {
        renderStartIndex = Math.max(0, this.getEstimatedIndex(scrollValue));

        // Make sure the renderEndIndex takes into account all the items on the row
        renderEndIndex = Math.min(data.length - 1,
          this.getEstimatedIndex(scrollValueEnd) + this.estimatedItemsAcross - 1);

        renderBeforeBoundary = Math.max(0,
          this.getEstimatedPrimaryPos(renderStartIndex));
        renderAfterBoundary = this.getEstimatedPrimaryPos(renderEndIndex) +
          this.estimatedPrimarySize;
      };
    }