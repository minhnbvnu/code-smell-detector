function prelink($scope, $element, $attr, tabsCtrl) {
        var deregisterInstance = $ionicTabsDelegate._registerInstance(
          tabsCtrl, $attr.delegateHandle, tabsCtrl.hasActiveScope
        );

        tabsCtrl.$scope = $scope;
        tabsCtrl.$element = $element;
        tabsCtrl.$tabsElement = jqLite($element[0].querySelector('.tabs'));

        $scope.$watch(function() { return $element[0].className; }, function(value) {
          var isTabsTop = value.indexOf('tabs-top') !== -1;
          var isHidden = value.indexOf('tabs-item-hide') !== -1;
          $scope.$hasTabs = !isTabsTop && !isHidden;
          $scope.$hasTabsTop = isTabsTop && !isHidden;
          $scope.$emit('$ionicTabs.top', $scope.$hasTabsTop);
        });

        function emitLifecycleEvent(ev, data) {
          ev.stopPropagation();
          var previousSelectedTab = tabsCtrl.previousSelectedTab();
          if (previousSelectedTab) {
            previousSelectedTab.$broadcast(ev.name.replace('NavView', 'Tabs'), data);
          }
        }

        $scope.$on('$ionicNavView.beforeLeave', emitLifecycleEvent);
        $scope.$on('$ionicNavView.afterLeave', emitLifecycleEvent);
        $scope.$on('$ionicNavView.leave', emitLifecycleEvent);

        $scope.$on('$destroy', function() {
          // variable to inform child tabs that they're all being blown away
          // used so that while destorying an individual tab, each one
          // doesn't select the next tab as the active one, which causes unnecessary
          // loading of tab views when each will eventually all go away anyway
          $scope.$tabsDestroy = true;
          deregisterInstance();
          tabsCtrl.$tabsElement = tabsCtrl.$element = tabsCtrl.$scope = innerElement = null;
          delete $scope.$hasTabs;
          delete $scope.$hasTabsTop;
        });
      }