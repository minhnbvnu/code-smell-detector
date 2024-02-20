function flushOnChangesQueue() {
      try {
        if (!(--onChangesTtl)) {
          // We have hit the TTL limit so reset everything
          onChangesQueue = undefined;
          throw $compileMinErr('infchng', '{0} $onChanges() iterations reached. Aborting!\n', TTL);
        }
        // We must run this hook in an apply since the $$postDigest runs outside apply
        $rootScope.$apply(function() {
          for (var i = 0, ii = onChangesQueue.length; i < ii; ++i) {
            onChangesQueue[i]();
          }
          // Reset the queue to trigger a new schedule next time there is a change
          onChangesQueue = undefined;
        });
      } finally {
        onChangesTtl++;
      }
    }