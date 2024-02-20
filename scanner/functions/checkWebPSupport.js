function checkWebPSupport() {
    if (!isBrowser) {
      return false;
    }
    try {
      const element = document.createElement("canvas");
      return element.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    } catch {
      return false;
    }
  }