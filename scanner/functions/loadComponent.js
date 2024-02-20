async function loadComponent(url, scope) {
  await loadScript(url);

  // From https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers
  // eslint-disable-next-line no-undef
  await __webpack_init_sharing__('default');
  const container = window._JUPYTERLAB[scope];
  // Initialize the container, it may provide shared modules and may need ours
  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__.default);
}