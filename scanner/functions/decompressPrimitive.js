async function decompressPrimitive(scenegraph, primitive, options, context) {
    const dracoExtension = scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION);
    if (!dracoExtension) {
      return;
    }
    const buffer = scenegraph.getTypedArrayForBufferView(dracoExtension.bufferView);
    const bufferCopy = sliceArrayBuffer(buffer.buffer, buffer.byteOffset);
    const { parse: parse5 } = context;
    const dracoOptions = { ...options };
    delete dracoOptions["3d-tiles"];
    const decodedData = await parse5(bufferCopy, DracoLoader2, dracoOptions, context);
    const decodedAttributes = getGLTFAccessors(decodedData.attributes);
    for (const [attributeName, decodedAttribute] of Object.entries(decodedAttributes)) {
      if (attributeName in primitive.attributes) {
        const accessorIndex = primitive.attributes[attributeName];
        const accessor = scenegraph.getAccessor(accessorIndex);
        if (accessor?.min && accessor?.max) {
          decodedAttribute.min = accessor.min;
          decodedAttribute.max = accessor.max;
        }
      }
    }
    primitive.attributes = decodedAttributes;
    if (decodedData.indices) {
      primitive.indices = getGLTFAccessor(decodedData.indices);
    }
    checkPrimitive(primitive);
  }