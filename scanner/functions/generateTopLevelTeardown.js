function generateTopLevelTeardown(view) {
  return function() { view.destroy(); };
}