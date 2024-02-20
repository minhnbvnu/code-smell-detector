function normalize(path) {
  // /a/b/./c/./d/. ==> /a/b/c/d
  path = path.replace(RE_IDLE_DOT, '/'); // a///b/////c ==> a/b/c

  path = path.replace(RE_MULTI_SLASH, '$1/'); // a/b/c/../../d  ==>  a/b/../d  ==>  a/d

  while (RE_DOUBLE_DOT.test(path)) {
    path = path.replace(RE_DOUBLE_DOT, '/');
  }

  return path;
}