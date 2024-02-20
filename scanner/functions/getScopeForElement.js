function getScopeForElement(element, stateData) {
    if ( !element ) {
      return null;
    }
    // check if it's abstract
    var attributeValue = angular.element(element).attr("abstract");
    var stateValue = angular.element(element).attr("state");

    if ( attributeValue !== "true" ) {
      // it's not an abstract view, so make sure the element
      // matches the state.  Due to abstract view weirdness,
      // sometimes it doesn't. If it doesn't, don't dispatch events
      // so leave the scope undefined
      if ( stateValue === stateData.stateName ) {
        return angular.element(element).scope();
      }
      return null;
    }
    else {
      // it is an abstract element, so look for element with the "state" attributeValue
      // set to the name of the stateData state
      var elements = aggregateNavViewChildren(element);
      for ( var i = 0; i < elements.length; i++ ) {
          var state = angular.element(elements[i]).attr("state");
          if ( state === stateData.stateName ) {
            stateData.abstractView = true;
            return angular.element(elements[i]).scope();
          }
      }
      // we didn't find a match, so return null
      return null;
    }
  }