function contentTypeFromString(str) {
  switch (str) {
    case "children":
      return MagicMoveClone.ContentType.CHILDREN;
    case "snapshot":
      return MagicMoveClone.ContentType.SNAPSHOT;
    case "rawImage":
      return MagicMoveClone.ContentType.RAWIMAGE;
    default:
      throw new Error(
        `[MagicMove] Invalid nativeContentType specified: ${str}`
      );
  }
}