function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}