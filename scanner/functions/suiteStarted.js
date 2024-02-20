function suiteStarted(suite) {
        currentlyExecutingSuites.push(suite);
        defaultResourcesForRunnable(suite.id, suite.parentSuite.id);
        reporter.suiteStarted(suite.result);
      }