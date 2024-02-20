function GridViewType() {
      this.getEstimatedSecondaryPos = function(index) {
        return (index % this.estimatedItemsAcross) * this.estimatedSecondarySize;
      };
      this.getEstimatedPrimaryPos = function(index) {
        return Math.floor(index / this.estimatedItemsAcross) * this.estimatedPrimarySize;
      };
      this.getEstimatedIndex = function(scrollValue) {
        return Math.floor(scrollValue / this.estimatedPrimarySize) *
          this.estimatedItemsAcross;
      };
    }