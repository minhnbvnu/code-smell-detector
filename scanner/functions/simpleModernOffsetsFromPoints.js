function simpleModernOffsetsFromPoints(
    outerNode,
    anchorNode,
    anchorOffset,
    focusNode,
    focusOffset,
  ) {
    let start;
    let end;
    let length = 0;

    function traverse(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node === anchorNode) {
          start = length + anchorOffset;
        }
        if (node === focusNode) {
          end = length + focusOffset;
        }
        length += node.nodeValue.length;
        return;
      }

      for (let i = 0; true; i++) {
        if (node === anchorNode && i === anchorOffset) {
          start = length;
        }
        if (node === focusNode && i === focusOffset) {
          end = length;
        }
        if (i === node.childNodes.length) {
          break;
        }
        let n = node.childNodes[i];
        traverse(n);
      }
    }
    traverse(outerNode);

    if (start === null || end === null) {
      throw new Error('Provided anchor/focus nodes were outside of root.');
    }
    return {start, end};
  }