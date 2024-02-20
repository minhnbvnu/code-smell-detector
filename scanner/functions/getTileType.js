function getTileType(tile) {
    if (!tile.contentUrl) {
      return TILE_TYPE.EMPTY;
    }
    const contentUrl = tile.contentUrl;
    const fileExtension = contentUrl.split(".").pop();
    switch (fileExtension) {
      case "pnts":
        return TILE_TYPE.POINTCLOUD;
      case "i3dm":
      case "b3dm":
      case "glb":
      case "gltf":
        return TILE_TYPE.SCENEGRAPH;
      default:
        return fileExtension;
    }
  }