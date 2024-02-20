function getCursor(context) {
    const { column, line, offset } = context;
    return { column, line, offset };
  }