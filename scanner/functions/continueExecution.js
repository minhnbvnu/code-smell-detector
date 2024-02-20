function continueExecution() {
    if (program.opts().disc) {
      executeMainActionLogic()
    } else {
      // Call checkForUpdate and wait for it to complete using .then()
      checkForUpdate().then(() => {
        // This block runs after checkForUpdate is complete
        executeMainActionLogic()
      })
    }
  }