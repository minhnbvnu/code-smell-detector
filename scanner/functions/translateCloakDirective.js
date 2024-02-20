function translateCloakDirective($translate, $rootScope) {

  'use strict';

  return {
    compile: function (tElement) {
      var applyCloak = function () {
        tElement.addClass($translate.cloakClassName());
      },
      removeCloak = function () {
        tElement.removeClass($translate.cloakClassName());
      };
      $translate.onReady(function () {
        removeCloak();
      });
      applyCloak();

      return function linkFn(scope, iElement, iAttr) {
        if (iAttr.translateCloak && iAttr.translateCloak.length) {
          // Register a watcher for the defined translation allowing a fine tuned cloak
          iAttr.$observe('translateCloak', function (translationId) {
            $translate(translationId).then(removeCloak, applyCloak);
          });
          // Register for change events as this is being another indicicator revalidating the cloak)
          $rootScope.$on('$translateChangeSuccess', function () {
            $translate(iAttr.translateCloak).then(removeCloak, applyCloak);
          });
        }
      };
    }
  };
}