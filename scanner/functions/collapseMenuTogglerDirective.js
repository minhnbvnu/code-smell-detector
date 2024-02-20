function collapseMenuTogglerDirective() {
  return {
    restrict: 'E',
    link
  };

  function link(scope, element, attrs) {
    element.on('click', function () {
      if (element.hasClass('navbar-toggler') && !element.hasClass('layout-toggler')) {
        angular.element('body').toggleClass('sidebar-mobile-show')
      }
    })
  }
}