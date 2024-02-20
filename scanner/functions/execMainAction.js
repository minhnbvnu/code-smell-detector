function execMainAction() {
  // if ((program.opts().fix || program.opts().fixShow) && !program.opts().noPrompt) {
  if (program.opts().fix && !program.opts().noPrompt) {
    askUserToContinue((userAnswer) => {
      if (userAnswer !== 'y') {
        console.log('\nProcess terminated by user')
        process.exit(0)
      } else {
        // User agreed, continue with the operation.
        continueExecution()
      }
    })
  } else {
    // No need for user input, continue with the operation.
    continueExecution()
  }

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
}