function create_debugging_comment(node2, component) {
    const { locate: locate2, source } = component;
    let c2 = node2.start;
    if (node2.type === "ElseBlock") {
      while (source[c2 - 1] !== "{")
        c2 -= 1;
      while (source[c2 - 1] === "{")
        c2 -= 1;
    }
    let d2;
    if (node2.type === "InlineComponent" || node2.type === "Element" || node2.type === "SlotTemplate") {
      if (node2.children.length) {
        d2 = node2.children[0].start;
        while (source[d2 - 1] !== ">")
          d2 -= 1;
      } else {
        d2 = node2.start;
        while (source[d2] !== ">")
          d2 += 1;
        d2 += 1;
      }
    } else if (node2.type === "Text" || node2.type === "Comment") {
      d2 = node2.end;
    } else {
      d2 = node2.expression ? node2.expression.node.end : c2;
      while (source[d2] !== "}" && d2 <= source.length)
        d2 += 1;
      while (source[d2] === "}")
        d2 += 1;
    }
    const start = locate2(c2);
    const loc = `(${start.line}:${start.column})`;
    return `${loc} ${source.slice(c2, d2)}`.replace(regex_whitespace_characters, " ");
  }