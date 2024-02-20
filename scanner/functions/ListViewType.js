function ListViewType() {
      this.getEstimatedSecondaryPos = function() {
        return 0;
      };
      this.getEstimatedPrimaryPos = function(index) {
        return index * this.estimatedPrimarySize;
      };
      this.getEstimatedIndex = function(scrollValue) {
        return Math.floor((scrollValue) / this.estimatedPrimarySize);
      };
    }