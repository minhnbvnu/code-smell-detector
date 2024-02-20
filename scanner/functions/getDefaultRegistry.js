function getDefaultRegistry(userconfig) {
  if (userconfig !== 'none' && fs.existsSync(userconfig)) {
    const content = fs.readFileSync(userconfig, 'utf8');
    // registry = {registry-url}
    const m = /^registry\s*=\s*(.+)$/m.exec(content);
    if (m) {
      return m[1];
    }
  }
  return config.cnpmRegistry;
}