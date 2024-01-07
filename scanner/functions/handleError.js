function handleError() {
      unlisten();
      reject(new Error('Image load error'));
    }