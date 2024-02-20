function toggleSibling() {
  var stepSibling = this.parentNode.getElementsByClassName('toggle-target')[0];
  var icon = this.getElementsByClassName('icon')[0];
  var klass = 'display-none';
  if (stepSibling.classList.contains(klass)) {
    stepSibling.classList.remove(klass);
    icon.innerHTML = '▾';
  } else {
    stepSibling.classList.add(klass);
    icon.innerHTML = '▸';
  }
}