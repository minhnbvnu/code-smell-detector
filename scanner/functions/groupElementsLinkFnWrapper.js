function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
      return function groupedElementsLink(scope, element, attrs, controllers, transcludeFn) {
        element = groupScan(element[0], attrStart, attrEnd);
        return linkFn(scope, element, attrs, controllers, transcludeFn);
      };
    }