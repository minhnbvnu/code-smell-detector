function showErr(message) {
  const $err = document.createElement("div");
  $err.innerText = `KISS-Translator: ${message}`;
  $err.style.cssText = "background:red; color:#fff;";
  document.body.prepend($err);
}