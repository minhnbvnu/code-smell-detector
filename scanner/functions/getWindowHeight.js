function getWindowHeight() {
  return window.innerHeight ||
         document.documentElement && document.documentElement.clientHeight ||
         document.body && document.body.clientHeight ||
         0;
}