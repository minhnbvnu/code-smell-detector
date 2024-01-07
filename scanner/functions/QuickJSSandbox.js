function QuickJSSandbox() {
  return (0, _quickjsEval.default)().then(module => {
    return new Sandbox(window, module);
  });
}