async function parse2(arrayBuffer) {
    return parseTextSync2(new TextDecoder().decode(arrayBuffer));
  }