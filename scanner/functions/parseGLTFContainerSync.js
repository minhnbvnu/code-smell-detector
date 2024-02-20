function parseGLTFContainerSync(gltf, data, byteOffset, options) {
    if (options.uri) {
      gltf.baseUri = options.uri;
    }
    if (data instanceof ArrayBuffer && !isGLB(data, byteOffset, options)) {
      const textDecoder = new TextDecoder();
      data = textDecoder.decode(data);
    }
    if (typeof data === "string") {
      gltf.json = parseJSON(data);
    } else if (data instanceof ArrayBuffer) {
      const glb = {};
      byteOffset = parseGLBSync(glb, data, byteOffset, options.glb);
      assert9(glb.type === "glTF", `Invalid GLB magic string ${glb.type}`);
      gltf._glb = glb;
      gltf.json = glb.json;
    } else {
      assert9(false, "GLTF: must be ArrayBuffer or string");
    }
    const buffers = gltf.json.buffers || [];
    gltf.buffers = new Array(buffers.length).fill(null);
    if (gltf._glb && gltf._glb.header.hasBinChunk) {
      const { binChunks } = gltf._glb;
      gltf.buffers[0] = {
        arrayBuffer: binChunks[0].arrayBuffer,
        byteOffset: binChunks[0].byteOffset,
        byteLength: binChunks[0].byteLength
      };
    }
    const images = gltf.json.images || [];
    gltf.images = new Array(images.length).fill({});
  }