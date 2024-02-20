function renderFileSize(numBytes) {
  if (numBytes < 1000) {
    return `${numBytes} bytes`;
  } else if (numBytes < 1000000) {
    return `${(numBytes / 1024).toFixed(1)} KB`;
  } else if (numBytes < 1000000000) {
    return `${(numBytes / 1048576).toFixed(1)} MB`;
  } else if (numBytes < 1000000000000) {
    return `${(numBytes / 1073741824).toFixed(1)} GB`;
  } else {
    return `${(numBytes / 1099511627776).toFixed(1)} TB`;
  }
}