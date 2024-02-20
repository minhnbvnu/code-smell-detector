function sidebarNavDynamicResizeDirective($window, $timeout) {
  return {
    restrict: 'E',
    link
  };

  function link(scope, element, attrs) {

    if (element.hasClass('sidebar-nav') && angular.element('body').hasClass('fixed-nav')) {
      const bodyHeight = angular.element(window).height();
      scope.$watch(function () {
        const headerHeight = angular.element('header').outerHeight();

        if (angular.element('body').hasClass('sidebar-off-canvas')) {
          element.css('height', bodyHeight);
        } else {
          element.css('height', bodyHeight - headerHeight);
        }
      });

      angular.element($window).bind('resize', function () {
        const bodyHeight = angular.element(window).height();
        const headerHeight = angular.element('header').outerHeight();
        const sidebarHeaderHeight = angular.element('.sidebar-header').outerHeight();
        const sidebarFooterHeight = angular.element('.sidebar-footer').outerHeight();

        if (angular.element('body').hasClass('sidebar-off-canvas')) {
          element.css('height', bodyHeight - sidebarHeaderHeight - sidebarFooterHeight);
        } else {
          element.css('height', bodyHeight - headerHeight - sidebarHeaderHeight - sidebarFooterHeight);
        }
      });
    }
  }
}