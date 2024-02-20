function prepare(commit, callback) {
  return _prepare(mandatory(commit.dir), mandatory(commit.env), callback);
}