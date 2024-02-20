async function getInitialDataUrl(resource) {
    const INITIAL_DATA_LENGTH = 5;
    if (typeof resource === "string") {
      return `data:,${resource.slice(0, INITIAL_DATA_LENGTH)}`;
    }
    if (resource instanceof Blob) {
      const blobSlice = resource.slice(0, 5);
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event?.target?.result);
        reader.readAsDataURL(blobSlice);
      });
    }
    if (resource instanceof ArrayBuffer) {
      const slice = resource.slice(0, INITIAL_DATA_LENGTH);
      const base64 = arrayBufferToBase64(slice);
      return `data:base64,${base64}`;
    }
    return null;
  }