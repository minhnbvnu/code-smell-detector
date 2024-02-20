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