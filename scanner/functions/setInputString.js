function setInputString(str) {
        callOrAssign({originalObject: str});

        if (scope.clearSelected) {
          scope.searchStr = null;
        }
        clearResults();
      }