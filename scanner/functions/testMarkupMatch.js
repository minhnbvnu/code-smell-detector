async function testMarkupMatch(serverElement, clientElement, shouldMatch) {
    const domElement = await serverRender(serverElement);
    resetModules();
    return renderIntoDom(
      clientElement,
      domElement.parentNode,
      true,
      shouldMatch ? 0 : 1,
    );
  }