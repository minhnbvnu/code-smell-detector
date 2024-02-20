function handleOverrideSuggestions(event) {
        if (scope.overrideSuggestions &&
            !(scope.selectedObject && scope.selectedObject.originalObject === scope.searchStr)) {
          if (event) {
            event.preventDefault();
          }

          // cancel search timer
          $timeout.cancel(searchTimer);
          // cancel http request
          cancelHttpRequest();

          setInputString(scope.searchStr);
        }
      }