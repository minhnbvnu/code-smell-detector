function combine_sourcemaps(filename, sourcemap_list) {
    if (sourcemap_list.length == 0)
      return null;
    let map_idx = 1;
    const map = sourcemap_list.slice(0, -1).find((m) => m.sources.length !== 1) === void 0 ? remapping(
      // use array interface
      // only the oldest sourcemap can have multiple sources
      sourcemap_list,
      () => null,
      true
      // skip optional field `sourcesContent`
    ) : remapping(
      // use loader interface
      sourcemap_list[0],
      // last map
      function loader(sourcefile) {
        if (sourcefile === filename && sourcemap_list[map_idx]) {
          return sourcemap_list[map_idx++];
        } else {
          return null;
        }
      },
      true
    );
    if (!map.file)
      delete map.file;
    if (!map.sources.length)
      map.sources = [filename];
    return map;
  }