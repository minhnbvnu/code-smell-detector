function aggregateNavViewChildren(element) {
    var aggregate = [];
    var navViews = angular.element(element).find("ion-nav-view");
    for ( var i = 0; i < navViews.length; i++ ) {
      var children = angular.element(navViews[i]).children();
      var childrenAggregated = [];
      for ( var j = 0; j < children.length; j++ ) {
        childrenAggregated = childrenAggregated.concat(children[j]);
      }
      aggregate = aggregate.concat(childrenAggregated);
    }
    return aggregate;
  }