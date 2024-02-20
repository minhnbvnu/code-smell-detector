function registerToolbar(target, name, config) {
  if (name) {
    target[name] = { ...config };
  } else {
    console.error('Toolbar name is required');
  }
}