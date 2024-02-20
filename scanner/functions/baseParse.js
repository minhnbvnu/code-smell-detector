function baseParse(content, options = {}) {
    const context = createParserContext(content, options);
    const start = getCursor(context);
    return createRoot(
      parseChildren(context, 0, []),
      getSelection(context, start)
    );
  }