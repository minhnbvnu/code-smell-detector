function completeIfDone() {
        if (outer.closed && subscriptions.length === 0)
          observer.complete();
      }