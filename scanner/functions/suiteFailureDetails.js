function suiteFailureDetails(result) {
      for (var i = 0; i < result.failedExpectations.length; i++) {
        printNewline();
        print(colored('red', 'An error was thrown in an afterAll'));
        printNewline();
        print(colored('red', 'AfterAll ' + result.failedExpectations[i].message));

      }
      printNewline();
    }