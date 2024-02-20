function isMenuItem(element) {
  return ['menuitem', 'menuitemradio', 'menuitemcheckbox'].includes(element?.role);
}