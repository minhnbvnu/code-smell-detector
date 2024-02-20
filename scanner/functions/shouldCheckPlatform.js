function shouldCheckPlatform(os, ignorePlatform) {
  return !ignorePlatform && Array.isArray(os) && os.length > 0;
}