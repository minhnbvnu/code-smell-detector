function matchClassProperty(key) {
  if (key === 'class' || key === 'className') {
    return true;
  }

  if (key.slice(0, 6) === 'class.') {
    return key.slice(6);
  }

  if (key.slice(0, 10) === 'className.') {
    return key.slice(10);
  }

  return false;
}