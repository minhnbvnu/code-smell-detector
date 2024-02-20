function update_built_version() {
  return src(built_plugin_json).pipe(jeditor((json) => {
    json.info.version = built_version;
    return json;
  }
  )).pipe(dest('./dist'))
}