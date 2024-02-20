function startNewLine(stream, state) {
    state.mode = Modes.newLayout;
    state.tableHeading = false;

    if (state.layoutType === "definitionList" && state.spanningLayout &&
        stream.match(RE("definitionListEnd"), false))
      state.spanningLayout = false;
  }