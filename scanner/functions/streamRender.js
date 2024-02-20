async function streamRender(reactElement, errorCount = 0) {
    const markup = await renderIntoStream(reactElement, errorCount);
    const domElement = document.createElement('div');
    domElement.innerHTML = markup;
    return domElement.firstChild;
  }