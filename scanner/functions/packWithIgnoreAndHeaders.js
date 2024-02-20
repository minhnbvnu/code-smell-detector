function packWithIgnoreAndHeaders(cwd, ignoreFunction, { mapHeader } = {}) {
  return tar.pack(cwd, {
    ignore: ignoreFunction,
    map: header => {
      const suffix = header.name === '.' ? '' : `/${header.name}`;
      header.name = `package${suffix}`;
      delete header.uid;
      delete header.gid;
      return mapHeader ? mapHeader(header) : header;
    }
  });
}