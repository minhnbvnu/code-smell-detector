function isAttrTruthy(scope, attr) {
      return (isString(attr) && attr.length === 0) || //empty attribute
             truthy(scope.$eval(attr));
     }