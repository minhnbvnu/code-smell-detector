function itThrowsWhenRendering(desc, testFn, partialMessage) {
    itThrows(
      `when rendering ${desc} with server string render`,
      () => testFn(serverRender),
      partialMessage,
    );
    itThrows(
      `when rendering ${desc} with clean client render`,
      () => testFn(clientCleanRender),
      partialMessage,
    );

    // we subtract one from the warning count here because the throw means that it won't
    // get the usual markup mismatch warning.
    itThrows(
      `when rendering ${desc} with client render on top of bad server markup`,
      () =>
        testFn((element, warningCount = 0) =>
          clientRenderOnBadMarkup(element, warningCount - 1),
        ),
      partialMessage,
    );
  }