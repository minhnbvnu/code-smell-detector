async function renderIntoString(reactElement, errorCount = 0) {
    return await expectErrors(
      () =>
        new Promise(resolve =>
          resolve(ReactDOMServer.renderToString(reactElement)),
        ),
      errorCount,
    );
  }