function getCmd(cmdLines) {
  let parser = [
    varAssign,
    varReassign,
    constAssign,
    consoleLog,
    conditionIf,
    conditionElIf,
    conditionElse,
    conditionClose,
    loopForOf,
    loopFor,
    functionDeclarationBegin,
    functionDeclarationEnd,
    functionCall,
    throwError,
    tryFn,
    catchFn,
    finallyFn,
    functionDeclarationAsyncBegin,
    awaitProcess,
    breakStatement,
    continueStatement
  ];

  return cmdLines
    .map((line) => {
      let cmd = null;

      for (const parse of parser) {
        cmd = parse(line);
        if (cmd) break;
      }

      return cmd;
    })
    .filter((v) => !!v);
}