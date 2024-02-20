async function loadDracoDecoderModule(options) {
    const modules = options.modules || {};
    if (modules.draco3d) {
      loadDecoderPromise = loadDecoderPromise || modules.draco3d.createDecoderModule({}).then((draco) => {
        return { draco };
      });
    } else {
      loadDecoderPromise = loadDecoderPromise || loadDracoDecoder(options);
    }
    return await loadDecoderPromise;
  }