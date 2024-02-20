function computeStyleDimensions() {
      if (!computedStyleNode) {
        transclude(computedStyleScope = scope.$new(), function(clone) {
          clone[0].removeAttribute('collection-repeat'); // remove absolute position styling
          computedStyleNode = clone[0];
        });
      }

      computedStyleScope[keyExpr] = (listGetter(scope) || [])[0];
      if (!$rootScope.$$phase) computedStyleScope.$digest();
      containerNode.appendChild(computedStyleNode);

      var style = $window.getComputedStyle(computedStyleNode);
      computedStyleDimensions.width = parseInt(style.width);
      computedStyleDimensions.height = parseInt(style.height);

      containerNode.removeChild(computedStyleNode);
    }