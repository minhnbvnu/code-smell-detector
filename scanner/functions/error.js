function error(msg) {
  document.body.appendChild(fragment('<div id="mocha-error">%s</div>', msg));
}