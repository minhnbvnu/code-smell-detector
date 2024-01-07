function bufferBBOX(bbox, bufferSize = 0) {
    bbox[0] -= bufferSize;
    bbox[1] -= bufferSize;
    bbox[2] += bufferSize;
    bbox[3] += bufferSize;
}