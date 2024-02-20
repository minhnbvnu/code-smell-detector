async function parseTile(arrayBuffer, options, context) {
    const tile = {
      content: {
        featureIds: null
      }
    };
    const byteOffset = 0;
    await parse3DTile(arrayBuffer, byteOffset, options, context, tile.content);
    return tile.content;
  }