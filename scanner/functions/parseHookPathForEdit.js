function parseHookPathForEdit(path) {
  let index = 0;

  for (let i = 0; i < path.length; i++) {
    if (path[i] === 'value') {
      index = i + 1;
      break;
    }
  }

  return path.slice(index);
}