function watchExpr(attrName, ariaAttr, negate) {
    return function(scope, elem, attr) {
      var ariaCamelName = attr.$normalize(ariaAttr);
      if (config[ariaCamelName] && !attr[ariaCamelName]) {
        scope.$watch(attr[attrName], function(boolVal) {
          if (negate) {
            boolVal = !boolVal;
          }
          elem.attr(ariaAttr, boolVal);
        });
      }
    };
  }