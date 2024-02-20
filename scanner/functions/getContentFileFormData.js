function getContentFileFormData (data) {
  if (!data.value) {
    if (Array.isArray(data.src)) {
      return data.src.length === 0 ? 'path/to/file' : data.src.join('/');
    }
    return data.src ? data.src : '/path/to/file';
  }
  return `'${sanitizeString(data.value, bodyTrim)}'`;
}