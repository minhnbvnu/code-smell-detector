async function parseToNodeImage(arrayBuffer, options) {
    const { mimeType } = getBinaryImageMetadata(arrayBuffer) || {};
    const _parseImageNode2 = globalThis._parseImageNode;
    assert2(_parseImageNode2);
    return await _parseImageNode2(arrayBuffer, mimeType);
  }