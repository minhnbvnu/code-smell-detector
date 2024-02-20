function base64FromDataArray(dataArray) {
  return window.btoa(Array.from(dataArray).map(byte => String.fromCharCode(byte)).join(""));
}