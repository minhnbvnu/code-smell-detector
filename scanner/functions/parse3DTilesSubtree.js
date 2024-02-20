async function parse3DTilesSubtree(data) {
    const magic = new Uint32Array(data.slice(0, 4));
    if (magic[0] !== SUBTREE_FILE_MAGIC) {
      throw new Error("Wrong subtree file magic number");
    }
    const version = new Uint32Array(data.slice(4, 8));
    if (version[0] !== SUBTREE_FILE_VERSION) {
      throw new Error("Wrong subtree file verson, must be 1");
    }
    const jsonByteLength = parseUint64Value(data.slice(8, 16));
    const stringAttribute = new Uint8Array(data, 24, jsonByteLength);
    const textDecoder = new TextDecoder("utf8");
    const string = textDecoder.decode(stringAttribute);
    const subtree = JSON.parse(string);
    const binaryByteLength = parseUint64Value(data.slice(16, 24));
    let internalBinaryBuffer = new ArrayBuffer(0);
    if (binaryByteLength) {
      internalBinaryBuffer = data.slice(24 + jsonByteLength);
    }
    if ("bufferView" in subtree.tileAvailability) {
      subtree.tileAvailability.explicitBitstream = await getExplicitBitstream(subtree, "tileAvailability", internalBinaryBuffer);
    }
    if ("bufferView" in subtree.contentAvailability) {
      subtree.contentAvailability.explicitBitstream = await getExplicitBitstream(subtree, "contentAvailability", internalBinaryBuffer);
    }
    if ("bufferView" in subtree.childSubtreeAvailability) {
      subtree.childSubtreeAvailability.explicitBitstream = await getExplicitBitstream(subtree, "childSubtreeAvailability", internalBinaryBuffer);
    }
    return subtree;
  }