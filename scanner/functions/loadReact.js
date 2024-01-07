function loadReact() {
  const {reactPath, reactDOMPath, needsReactDOM} = reactPaths();

  let request = loadScript(reactPath);

  if (needsReactDOM) {
    request = request.then(() => loadScript(reactDOMPath));
  } else {
    // Aliasing React to ReactDOM for compatibility.
    request = request.then(() => {
      window.ReactDOM = window.React;
    });
  }

  return request;
}