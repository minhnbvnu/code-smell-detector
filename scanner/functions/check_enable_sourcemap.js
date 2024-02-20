function check_enable_sourcemap(enable_sourcemap, namespace) {
    return typeof enable_sourcemap === "boolean" ? enable_sourcemap : enable_sourcemap[namespace];
  }