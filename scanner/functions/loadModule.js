async function loadModule() {
  const num = window.location.hash.substr(1) || 1;
  const module = await
  import (`../loops/${num}.js`);
  document.body.appendChild(module.canvas);
  return module;
}