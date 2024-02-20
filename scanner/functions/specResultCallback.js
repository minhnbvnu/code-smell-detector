function specResultCallback(result) {
        clearResourcesForRunnable(spec.id);
        currentSpec = null;
        reporter.specDone(result);
      }