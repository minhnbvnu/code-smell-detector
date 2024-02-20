function headerFooterBarDirective(isHeader) {
  return ['$document', '$timeout', function($document, $timeout) {
    return {
      restrict: 'E',
      controller: '$ionicHeaderBar',
      compile: function(tElement) {
        tElement.addClass(isHeader ? 'bar bar-header' : 'bar bar-footer');
        // top style tabs? if so, remove bottom border for seamless display
        $timeout(function() {
          if (isHeader && $document[0].getElementsByClassName('tabs-top').length) tElement.addClass('has-tabs-top');
        });

        return { pre: prelink };
        function prelink($scope, $element, $attr, ctrl) {
          if (isHeader) {
            $scope.$watch(function() { return $element[0].className; }, function(value) {
              var isShown = value.indexOf('ng-hide') === -1;
              var isSubheader = value.indexOf('bar-subheader') !== -1;
              $scope.$hasHeader = isShown && !isSubheader;
              $scope.$hasSubheader = isShown && isSubheader;
              $scope.$emit('$ionicSubheader', $scope.$hasSubheader);
            });
            $scope.$on('$destroy', function() {
              delete $scope.$hasHeader;
              delete $scope.$hasSubheader;
            });
            ctrl.align();
            $scope.$on('$ionicHeader.align', function() {
              ionic.requestAnimationFrame(function() {
                ctrl.align();
              });
            });

          } else {
            $scope.$watch(function() { return $element[0].className; }, function(value) {
              var isShown = value.indexOf('ng-hide') === -1;
              var isSubfooter = value.indexOf('bar-subfooter') !== -1;
              $scope.$hasFooter = isShown && !isSubfooter;
              $scope.$hasSubfooter = isShown && isSubfooter;
            });
            $scope.$on('$destroy', function() {
              delete $scope.$hasFooter;
              delete $scope.$hasSubfooter;
            });
            $scope.$watch('$hasTabs', function(val) {
              $element.toggleClass('has-tabs', !!val);
            });
            ctrl.align();
            $scope.$on('$ionicFooter.align', function() {
              ionic.requestAnimationFrame(function() {
                ctrl.align();
              });
            });
          }
        }
      }
    };
  }];
}