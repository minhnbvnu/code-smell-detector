function htmlReplace (before, after) {
  replace.sync({
    from: before,
    to: after,
    files: 'gh-pages/**/*.html'
  });
}