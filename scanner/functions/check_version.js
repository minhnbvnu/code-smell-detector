async function check_version() {
  if (plugin_version === package_version) {
    info(`${plugin_file}.version : ${plugin_version}`)
    return plugin_version;
  }
  error(`properties version in ${plugin_file} not the same in ${package_file}`);
  return false;
}