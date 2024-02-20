function digestEnteringItems() {
      var item;
      if (digestEnteringItems.running) return;
      digestEnteringItems.running = true;

      $$rAF(function process() {
        var rootScopePhase = $rootScope.$$phase;
        while (itemsEntering.length) {
          item = itemsEntering.pop();
          if (item.isShown) {
            if (!rootScopePhase) item.scope.$digest();
          }
        }
        digestEnteringItems.running = false;
      });
    }