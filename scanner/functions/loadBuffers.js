async function loadBuffers(gltf, options, context) {
    const buffers = gltf.json.buffers || [];
    for (let i2 = 0; i2 < buffers.length; ++i2) {
      const buffer = buffers[i2];
      if (buffer.uri) {
        const { fetch: fetch2 } = context;
        assert9(fetch2);
        const uri = resolveUrl(buffer.uri, options);
        const response = await context?.fetch?.(uri);
        const arrayBuffer = await response?.arrayBuffer?.();
        gltf.buffers[i2] = {
          arrayBuffer,
          byteOffset: 0,
          byteLength: arrayBuffer.byteLength
        };
        delete buffer.uri;
      }
    }
  }