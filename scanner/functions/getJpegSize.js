function getJpegSize(contents) {
  // Check file contains the JPEG "start of image" (SOI) marker.
  if (contents.readUInt16BE(0) !== 0xffd8) {
    return null;
  }

  const {tableMarkers, sofMarkers} = getJpegMarkers();

  // Exclude the two byte SOI marker.
  let i = 2;
  while (i < contents.length) {
    const marker = contents.readUInt16BE(i);

    // The frame that contains the width and height of the JPEG image.
    if (sofMarkers.has(marker)) {
      // Number of lines.
      const height = contents.readUInt16BE(i + 5);
      // Number of pixels per line.
      const width = contents.readUInt16BE(i + 7);
      return {width, height};
    }

    // Miscellaneous tables/data preceding the frame header.
    if (!tableMarkers.has(marker)) {
      return null;
    }

    // Length includes size of length parameter but not the two byte header.
    i += 2;
    i += contents.readUInt16BE(i);
  }

  return null;
}