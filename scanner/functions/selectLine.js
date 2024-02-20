function selectLine(line) {
      setSelectionUser({line: line, ch: 0}, clipPos({line: line + 1, ch: 0}));
    }