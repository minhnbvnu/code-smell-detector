function parse3DTileGLTFViewSync(tile, arrayBuffer, byteOffset, options) {
    tile.rotateYtoZ = true;
    const gltfByteLength = tile.byteOffset + tile.byteLength - byteOffset;
    if (gltfByteLength === 0) {
      throw new Error("glTF byte length must be greater than 0.");
    }
    tile.gltfUpAxis = options["3d-tiles"] && options["3d-tiles"].assetGltfUpAxis ? options["3d-tiles"].assetGltfUpAxis : "Y";
    tile.gltfArrayBuffer = sliceArrayBuffer(arrayBuffer, byteOffset, gltfByteLength);
    tile.gltfByteOffset = 0;
    tile.gltfByteLength = gltfByteLength;
    if (byteOffset % 4 === 0) {
    } else {
      console.warn(`${tile.type}: embedded glb is not aligned to a 4-byte boundary.`);
    }
    return tile.byteOffset + tile.byteLength;
  }