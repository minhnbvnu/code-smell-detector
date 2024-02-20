function selectionChanged() {
          scope.$apply(function() {
            var collection = valuesFn(scope) || [];
            var viewValue;
            if (multiple) {
              viewValue = [];
              forEach(selectElement.val(), function(selectedKey) {
                  selectedKey = trackFn ? trackKeysCache[selectedKey] : selectedKey;
                viewValue.push(getViewValue(selectedKey, collection[selectedKey]));
              });
            } else {
              var selectedKey = trackFn ? trackKeysCache[selectElement.val()] : selectElement.val();
              viewValue = getViewValue(selectedKey, collection[selectedKey]);
            }
            ctrl.$setViewValue(viewValue);
            render();
          });
        }