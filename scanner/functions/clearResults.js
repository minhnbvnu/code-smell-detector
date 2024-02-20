function clearResults() {
        scope.showDropdown = false;
        scope.results = [];
        if (dd) {
          dd.scrollTop = 0;
        }
      }