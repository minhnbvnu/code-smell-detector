function curUrlFromByteArray(arr) {
  const base64 = base64FromDataArray(arr);
  return `data:image/x-win-bitmap;base64,${base64}`;
}