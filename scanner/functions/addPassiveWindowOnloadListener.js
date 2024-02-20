function addPassiveWindowOnloadListener() {
  window.addEventListener("load", function() {
    CheckIfURLShouldBeBlocked();
  }, false);
}