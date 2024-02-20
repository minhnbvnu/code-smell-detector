function hasImplicitTilingExtension(tilesetJson) {
    return tilesetJson?.extensionsRequired?.includes(IMPLICIT_TILING_EXTENSION_NAME) && tilesetJson?.extensionsUsed?.includes(IMPLICIT_TILING_EXTENSION_NAME);
  }