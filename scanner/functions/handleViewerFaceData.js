function handleViewerFaceData(frame, dataArray, l = null, x = null) {
  const faceData = new viewerFaceDataStruct(frame, l, x);
  dataArray.push(faceData);
}