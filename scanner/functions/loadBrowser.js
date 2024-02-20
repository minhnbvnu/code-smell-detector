function loadBrowser() {
  let namespaces;
  try {
    namespaces = localStorage.getItem('debug');
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  // eslint-disable-next-line no-undef
  if (!namespaces && typeof process !== 'undefined' && 'env' in process) {
    // eslint-disable-next-line no-undef
    namespaces = process.env.DEBUG;
  }

  return {
    namespaces: namespaces || '',
    colors: browserColors,
    useColors: true,
    formatArgs: formatBrowserArgs
  };
}