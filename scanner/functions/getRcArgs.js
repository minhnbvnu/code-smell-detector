function getRcArgs(commandName, args, previousCwds = []) {
  // for the cwd, use the --cwd arg if it was passed or else use process.cwd()
  const origCwd = extractCwdArg(args) || process.cwd();

  // get a map of command names and their arguments
  const argMap = buildRcArgs(origCwd, args);

  // concat wildcard arguments and arguments meant for this specific command
  const newArgs = [...(argMap.get('*') || []), ...(argMap.get(commandName) || [])];

  // check if the .yarnrc args specified a cwd
  const newCwd = extractCwdArg(newArgs);
  if (newCwd && newCwd !== origCwd) {
    // ensure that we don't enter into a loop
    if (previousCwds.indexOf(newCwd) !== -1) {
      throw new Error(`Recursive .yarnrc files specifying --cwd flags. Bailing out.`);
    }

    //  if we have a new cwd then let's refetch the .yarnrc args relative to it
    return getRcArgs(commandName, newArgs, previousCwds.concat(origCwd));
  }

  return newArgs;
}