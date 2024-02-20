function compressMesh(attributes, indices, mode = 4, options, context) {
    if (!options.DracoWriter) {
      throw new Error("options.gltf.DracoWriter not provided");
    }
    const compressedData = options.DracoWriter.encodeSync({ attributes });
    const decodedData = context?.parseSync?.({ attributes });
    const fauxAccessors = options._addFauxAttributes(decodedData.attributes);
    const bufferViewIndex = options.addBufferView(compressedData);
    const glTFMesh = {
      primitives: [
        {
          attributes: fauxAccessors,
          mode,
          extensions: {
            [KHR_DRACO_MESH_COMPRESSION]: {
              bufferView: bufferViewIndex,
              attributes: fauxAccessors
            }
          }
        }
      ]
    };
    return glTFMesh;
  }