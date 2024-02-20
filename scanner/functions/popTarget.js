function popTarget () {
  Dep.target = targetStack.pop();
}