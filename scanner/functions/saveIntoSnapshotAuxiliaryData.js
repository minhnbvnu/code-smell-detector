function saveIntoSnapshotAuxiliaryData(absoluteFilePath, content) {
    const relativeFilePath = path.relative(
      CONFIG.intermediateAppPath,
      absoluteFilePath
    );
    if (
      !CONFIG.snapshotAuxiliaryData.lessSourcesByRelativeFilePath.hasOwnProperty(
        relativeFilePath
      )
    ) {
      CONFIG.snapshotAuxiliaryData.lessSourcesByRelativeFilePath[
        relativeFilePath
      ] = {
        content: content,
        digest: LessCache.digestForContent(content)
      };
    }
  }