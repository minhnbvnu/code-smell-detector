function get_sourcemap_source_filename(compile_options) {
    if (!compile_options.filename)
      return null;
    return compile_options.outputFilename ? get_relative_path(compile_options.outputFilename, compile_options.filename) : get_basename(compile_options.filename);
  }