function MediaFile(name, fullPath, type, lastModifiedDate, size) {
    this.name = name || null;
    this.fullPath = fullPath || null;
    this.type = type || null;
    this.lastModifiedDate = lastModifiedDate || null;
    this.size = size || 0;
}