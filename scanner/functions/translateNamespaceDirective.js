function translateNamespaceDirective() {

  'use strict';

  return {
    restrict: 'A',
    scope: true,
    compile: function () {
      return {
        pre: function (scope, iElement, iAttrs) {
          scope.translateNamespace = getTranslateNamespace(scope);

          if (scope.translateNamespace && iAttrs.translateNamespace.charAt(0) === '.') {
            scope.translateNamespace += iAttrs.translateNamespace;
          } else {
            scope.translateNamespace = iAttrs.translateNamespace;
          }
        }
      };
    }
  };
}