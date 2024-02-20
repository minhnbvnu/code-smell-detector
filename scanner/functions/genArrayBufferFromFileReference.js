async function genArrayBufferFromFileReference(fileReference) {
  browser_default()(fileReference != null, "Attempt to get an ArrayBuffer without assigning a fileReference");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(fileReference);
  });
}