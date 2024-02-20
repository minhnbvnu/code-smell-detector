function getParentNodeByTagName(element, tagName) {
      element = angular.element(element);
      var parent = element.parent();
      tagName = tagName.toLowerCase();

      if ( parent && parent[0].tagName.toLowerCase() === tagName ) {
          return parent;
      } else {
          return !parent ? null : getParentNodeByTagName(parent, tagName);
      }
    }