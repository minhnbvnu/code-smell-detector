function gotoCurrentTarget() {
  showHashTarget(location.hash.substring(1));
  scrollIntoView(location.hash.substring(1));
}