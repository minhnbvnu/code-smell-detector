function mutationMacro(nodes) {
    if (nodes.length === 1) {
      return textNodeIfPrimitive(nodes[0]);
    }
    for (var
      fragment = createDocumentFragment(),
      list = slice.call(nodes),
      i = 0; i < nodes.length; i++
    ) {
      fragment.appendChild(textNodeIfPrimitive(list[i]));
    }
    return fragment;
  }