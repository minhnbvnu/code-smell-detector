function getGlobalPrefix() {
  if (process.env.PREFIX) {
    return process.env.PREFIX;
  } else if (process.platform === 'win32') {
    // c:\node\node.exe --> prefix=c:\node\
    return (_path2 || _load_path2()).default.dirname(process.execPath);
  } else {
    // /usr/local/bin/node --> prefix=/usr/local
    let prefix = (_path2 || _load_path2()).default.dirname((_path2 || _load_path2()).default.dirname(process.execPath));

    // destdir only is respected on Unix
    if (process.env.DESTDIR) {
      prefix = (_path2 || _load_path2()).default.join(process.env.DESTDIR, prefix);
    }

    return prefix;
  }
}