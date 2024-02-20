function layoutToggleDirective($interval) {
  return {
    restrict: 'E',
    link
  };

  function link(scope, element, attrs) {
    element.on('click', function () {

      if (element.hasClass('sidebar-toggler')) {
        angular.element('body').toggleClass('sidebar-hidden');
      }

      if (element.hasClass('aside-menu-toggler')) {
        angular.element('body').toggleClass('aside-menu-hidden');
      }
    });
  }
}