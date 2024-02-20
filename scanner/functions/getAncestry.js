function getAncestry() {
  let path = this;
  const paths = [];

  do {
    paths.push(path);
  } while (path = path.parentPath);

  return paths;
}