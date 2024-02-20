function tabSelected(isSelected) {
          if (isSelected && childElementCount) {
            // this tab is being selected

            // check if the tab is already in the DOM
            // only do this if the tab has child elements
            if (!isTabContentAttached) {
              // tab should be selected and is NOT in the DOM
              // create a new scope and append it
              childScope = $scope.$new();
              childElement = jqLite(tabContentEle);
              $ionicViewSwitcher.viewEleIsActive(childElement, true);
              tabsCtrl.$element.append(childElement);
              $compile(childElement)(childScope);
              isTabContentAttached = true;
            }

            // remove the hide class so the tabs content shows up
            $ionicViewSwitcher.viewEleIsActive(childElement, true);

          } else if (isTabContentAttached && childElement) {
            // this tab should NOT be selected, and it is already in the DOM

            if ($ionicConfig.views.maxCache() > 0) {
              // keep the tabs in the DOM, only css hide it
              $ionicViewSwitcher.viewEleIsActive(childElement, false);

            } else {
              // do not keep tabs in the DOM
              destroyTab();
            }

          }
        }