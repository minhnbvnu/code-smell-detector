function unbind(el) {
  document.documentElement.removeEventListener('click', el[HANDLER], false);
  delete el[HANDLER];
}