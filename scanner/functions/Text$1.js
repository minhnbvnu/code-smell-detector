function Text$1(node2, renderer, _options) {
    let text2 = node2.data;
    if (!node2.parent || node2.parent.type !== "Element" || node2.parent.name !== "script" && node2.parent.name !== "style") {
      text2 = escape_html(text2);
    }
    renderer.add_string(text2);
  }