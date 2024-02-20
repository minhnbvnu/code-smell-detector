function normalizeSimplePath(input) {
    const { href } = new Url(input, "https://foo.com/");
    return href.slice("https://foo.com/".length);
  }