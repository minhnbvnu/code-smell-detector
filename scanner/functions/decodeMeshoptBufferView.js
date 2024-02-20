async function decodeMeshoptBufferView(scenegraph, bufferView) {
    const meshoptExtension = scenegraph.getObjectExtension(bufferView, EXT_MESHOPT_COMPRESSION);
    if (meshoptExtension) {
      const buffer = bufferView.buffer;
      const {
        byteOffset = 0,
        byteLength = 0,
        byteStride,
        count,
        mode,
        filter = "NONE"
      } = meshoptExtension;
      const source = new Uint8Array(buffer, byteOffset, byteLength);
      const result = new ArrayBuffer(count * byteStride);
      await meshoptDecodeGltfBuffer(new Uint8Array(result), count, byteStride, source, mode, filter);
      return result;
    }
    return null;
  }