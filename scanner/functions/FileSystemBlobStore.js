constructor(directory) {
    this.blobFilename = path.join(directory, 'BLOB');
    this.blobMapFilename = path.join(directory, 'MAP');
    this.lockFilename = path.join(directory, 'LOCK');
    this.reset();
  }