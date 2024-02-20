function dataURLtoBlob(dataURL) {
  // Decode the dataURL
  const binary = atob(dataURL.split(',')[1]);

  // Create 8-bit unsigned array
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  // Return our Blob object
  return new Blob([new Uint8Array(array)], { type: 'image/png' });
}