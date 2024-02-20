function loadReactDOM(envSimulator) {
    jest.resetModules();
    if (envSimulator) {
      envSimulator();
    }
    return require('react-dom');
  }