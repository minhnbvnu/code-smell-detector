function IsEnabledAndSupported(fileName) {
  const fileExt = path.extname(fileName);
  return EnabledAndSupported().includes(fileExt);
}