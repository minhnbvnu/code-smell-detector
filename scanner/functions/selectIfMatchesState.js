function selectIfMatchesState() {
          if (tabCtrl.tabMatchesState()) {
            tabsCtrl.select($scope, false);
          }
        }