function createTypedArrayFromAccessor(tile3DAccessor, buffer, byteOffset, length4) {
    const { componentType } = tile3DAccessor;
    assert2(tile3DAccessor.componentType);
    const type = typeof componentType === "string" ? GLType.fromName(componentType) : componentType;
    const size = COMPONENTS_PER_ATTRIBUTE[tile3DAccessor.type];
    const unpacker = UNPACKER[tile3DAccessor.type];
    const packer = PACKER[tile3DAccessor.type];
    byteOffset += tile3DAccessor.byteOffset;
    const values = GLType.createTypedArray(type, buffer, byteOffset, size * length4);
    return {
      values,
      type,
      size,
      unpacker,
      packer
    };
  }