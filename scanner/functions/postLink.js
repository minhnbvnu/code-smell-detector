function postLink($scope, $element, $attr, tabsCtrl) {
        if (!tabsCtrl.selectedTab()) {
          // all the tabs have been added
          // but one hasn't been selected yet
          tabsCtrl.select(0);
        }
      }