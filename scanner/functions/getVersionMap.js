function getVersionMap(all_versions) {
  const version_map = new Map();
  const breakpoint = /(\d+.\d+)/;
  all_versions.forEach((e) => {
    v = e.split(breakpoint).filter(Boolean);
    if (version_map.has(v[0])) version_map.get(v[0]).push(v[1]);
    else {
      version_map.set(v[0], [v[1]]);
    }
  });

  return version_map;
}