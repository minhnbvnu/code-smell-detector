function boundTranscludeFn(transcludedScope, cloneFn, controllers, futureParentElement, containingScope) {

        if (!transcludedScope) {
          transcludedScope = scope.$new(false, containingScope);
          transcludedScope.$$transcluded = true;
        }

        return transcludeFn(transcludedScope, cloneFn, {
          parentBoundTranscludeFn: previousBoundTranscludeFn,
          transcludeControllers: controllers,
          futureParentElement: futureParentElement
        });
      }