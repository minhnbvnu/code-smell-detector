function isUnnamedBuiltInHook(hook) {
  return ['Effect', 'ImperativeHandle', 'LayoutEffect', 'DebugValue'].includes(hook.name);
}