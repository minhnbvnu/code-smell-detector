function getPlatform(name) {
  const platform = platforms[name];
  if (!platform) throw new Error(`Platform "${name}" is not supported`);
  return platform;
}