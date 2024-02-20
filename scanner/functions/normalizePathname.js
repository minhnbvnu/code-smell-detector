function normalizePathname(pathname) {
    if (pathname.charAt(0) !== '/') {
      pathname = '/' + pathname
    }
    return pathname
  }