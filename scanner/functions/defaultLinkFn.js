function defaultLinkFn(scope, element, attr) {
    scope.$watch(attr[normalized], function ngBooleanAttrWatchAction(value) {
      attr.$set(attrName, !!value);
    });
  }