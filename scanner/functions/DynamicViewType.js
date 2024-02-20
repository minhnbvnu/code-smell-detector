function DynamicViewType() {
      var self = this;
      var debouncedScrollViewSetDimensions = ionic.debounce(scrollViewSetDimensions, 25, true);
      var calculateDimensions = isGridView ? calculateDimensionsGrid : calculateDimensionsList;
      var dimensionsIndex;
      var dimensions = [];


      // Get the dimensions at index. {width, height, left, top}.
      // We start with no dimensions calculated, then any time dimensions are asked for at an
      // index we calculate dimensions up to there.
      function calculateDimensionsList(toIndex) {
        var i, prevDimension, dim;
        for (i = Math.max(0, dimensionsIndex); i <= toIndex && (dim = dimensions[i]); i++) {
          prevDimension = dimensions[i - 1] || EMPTY_DIMENSION;
          dim.primarySize = self.getItemPrimarySize(i, data[i]);
          dim.secondarySize = self.scrollSecondarySize;
          dim.primaryPos = prevDimension.primaryPos + prevDimension.primarySize;
          dim.secondaryPos = 0;
        }
      }
      function calculateDimensionsGrid(toIndex) {
        var i, prevDimension, dim;
        for (i = Math.max(dimensionsIndex, 0); i <= toIndex && (dim = dimensions[i]); i++) {
          prevDimension = dimensions[i - 1] || EMPTY_DIMENSION;
          dim.secondarySize = Math.min(
            self.getItemSecondarySize(i, data[i]),
            self.scrollSecondarySize
          );
          dim.secondaryPos = prevDimension.secondaryPos + prevDimension.secondarySize;

          if (i === 0 || dim.secondaryPos + dim.secondarySize > self.scrollSecondarySize) {
            dim.secondaryPos = 0;
            dim.primarySize = self.getItemPrimarySize(i, data[i]);
            dim.primaryPos = prevDimension.primaryPos + prevDimension.rowPrimarySize;

            dim.rowStartIndex = i;
            dim.rowPrimarySize = dim.primarySize;
          } else {
            dim.primarySize = self.getItemPrimarySize(i, data[i]);
            dim.primaryPos = prevDimension.primaryPos;
            dim.rowStartIndex = prevDimension.rowStartIndex;

            dimensions[dim.rowStartIndex].rowPrimarySize = dim.rowPrimarySize = Math.max(
              dimensions[dim.rowStartIndex].rowPrimarySize,
              dim.primarySize
            );
            dim.rowPrimarySize = Math.max(dim.primarySize, dim.rowPrimarySize);
          }
        }
      }

      this.getContentSize = function() {
        var dim = dimensions[dimensionsIndex] || EMPTY_DIMENSION;
        return ((dim.primaryPos + dim.primarySize) || 0) +
          this.getEstimatedPrimaryPos(data.length - dimensionsIndex - 1) +
          repeaterBeforeSize + repeaterAfterSize;
      };
      this.onDestroy = function() {
        dimensions.length = 0;
      };

      this.onRefreshData = function() {
        var i;
        var ii;
        // Make sure dimensions has as many items as data.length.
        // This is to be sure we don't have to allocate objects while scrolling.
        for (i = dimensions.length, ii = data.length; i < ii; i++) {
          dimensions.push({});
        }
        dimensionsIndex = -1;
      };
      this.onRefreshLayout = function() {
        dimensionsIndex = -1;
      };
      this.getDimensions = function(index) {
        index = Math.min(index, data.length - 1);

        if (dimensionsIndex < index) {
          // Once we start asking for dimensions near the end of the list, go ahead and calculate
          // everything. This is to make sure when the user gets to the end of the list, the
          // scroll height of the list is 100% accurate (not estimated anymore).
          if (index > data.length * 0.9) {
            calculateDimensions(data.length - 1);
            dimensionsIndex = data.length - 1;
            scrollViewSetDimensions();
          } else {
            calculateDimensions(index);
            dimensionsIndex = index;
            debouncedScrollViewSetDimensions();
          }

        }
        return dimensions[index];
      };

      var oldRenderStartIndex = -1;
      var oldScrollValue = -1;
      this.updateRenderRange = function(scrollValue, scrollValueEnd) {
        var i;
        var len;
        var dim;

        // Calculate more dimensions than we estimate we'll need, to be sure.
        this.getDimensions( this.getEstimatedIndex(scrollValueEnd) * 2 );

        // -- Calculate renderStartIndex
        // base case: start at 0
        if (oldRenderStartIndex === -1 || scrollValue === 0) {
          i = 0;
        // scrolling down
        } else if (scrollValue >= oldScrollValue) {
          for (i = oldRenderStartIndex, len = data.length; i < len; i++) {
            if ((dim = this.getDimensions(i)) && dim.primaryPos + dim.rowPrimarySize >= scrollValue) {
              break;
            }
          }
        // scrolling up
        } else {
          for (i = oldRenderStartIndex; i >= 0; i--) {
            if ((dim = this.getDimensions(i)) && dim.primaryPos <= scrollValue) {
              // when grid view, make sure the render starts at the beginning of a row.
              i = isGridView ? dim.rowStartIndex : i;
              break;
            }
          }
        }

        renderStartIndex = Math.min(Math.max(0, i), data.length - 1);
        renderBeforeBoundary = renderStartIndex !== -1 ? this.getDimensions(renderStartIndex).primaryPos : -1;

        // -- Calculate renderEndIndex
        var lastRowDim;
        for (i = renderStartIndex + 1, len = data.length; i < len; i++) {
          if ((dim = this.getDimensions(i)) && dim.primaryPos + dim.rowPrimarySize > scrollValueEnd) {

            // Go all the way to the end of the row if we're in a grid
            if (isGridView) {
              lastRowDim = dim;
              while (i < len - 1 &&
                    (dim = this.getDimensions(i + 1)).primaryPos === lastRowDim.primaryPos) {
                i++;
              }
            }
            break;
          }
        }

        renderEndIndex = Math.min(i, data.length - 1);
        renderAfterBoundary = renderEndIndex !== -1 ?
          ((dim = this.getDimensions(renderEndIndex)).primaryPos + (dim.rowPrimarySize || dim.primarySize)) :
          -1;

        oldScrollValue = scrollValue;
        oldRenderStartIndex = renderStartIndex;
      };
    }