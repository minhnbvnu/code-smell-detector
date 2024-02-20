async function serverRender(reactElement, errorCount = 0) {
    const markup = await renderIntoString(reactElement, errorCount);
    const domElement = document.createElement('div');
    domElement.innerHTML = markup;
    return domElement.firstChild;
  }