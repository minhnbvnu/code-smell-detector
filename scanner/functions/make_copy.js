function make_copy() {
    return all([
      h.copyToTmp(example_fixtures),
      h.tmp_dir()
    ]);
  }