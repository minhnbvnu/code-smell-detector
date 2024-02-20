function extPacker(value) {
    if (packer) value = packer(value);
    return new ExtBuffer(value, etype);
  }