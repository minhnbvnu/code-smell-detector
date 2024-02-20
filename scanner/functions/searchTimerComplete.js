function searchTimerComplete(str) {
        // Begin the search
        if (!str || str.length < minlength) {
          return;
        }
        if (scope.localData) {
          scope.$apply(function() {
            var matches;
            if (typeof scope.localSearch() !== 'undefined') {
              matches = scope.localSearch()(str, scope.localData);
            } else {
              matches = getLocalResults(str);
            }
            scope.searching = false;
            processResults(matches, str);
          });
        }
        else if (scope.remoteApiHandler) {
          getRemoteResultsWithCustomHandler(str);
        } else {
          getRemoteResults(str);
        }
      }