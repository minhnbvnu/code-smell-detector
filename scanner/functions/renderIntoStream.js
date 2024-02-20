async function renderIntoStream(reactElement, errorCount = 0) {
    return await expectErrors(
      () =>
        new Promise(resolve => {
          let writable = new DrainWritable();
          ReactDOMServer.renderToNodeStream(reactElement).pipe(writable);
          writable.on('finish', () => resolve(writable.buffer));
        }),
      errorCount,
    );
  }