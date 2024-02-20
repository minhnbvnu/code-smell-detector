function navigationDirective() {
  return {
    restrict: 'E',
    link
  };

  function link(scope, element, attrs) {
    if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() > 782) {
      element.on('click', function () {
        if (!angular.element('body').hasClass('compact-nav')) {
          element.parent().toggleClass('open').find('.open').removeClass('open');
        }
      });
    } else if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() < 783) {
      element.on('click', function () {
        element.parent().toggleClass('open').find('.open').removeClass('open');
      });
    }
  }
}