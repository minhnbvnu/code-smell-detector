async function resolveDebuggerPathToMount(debuggerPath) {
  if (!debuggerPath) { return {}; }
  const absDebuggerPath = path.resolve(debuggerPath);
  return {
    Type: 'bind',
    Source: absDebuggerPath,
    Target: '/tmp/debugger_files',
    ReadOnly: false
  };
}