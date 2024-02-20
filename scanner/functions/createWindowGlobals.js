function createWindowGlobals(id) {
  if (windowGlobals[id]) {
    console.error('windowGlobals', id, 'already exists');
    return;
  }
  windowGlobals[id] = {};
}