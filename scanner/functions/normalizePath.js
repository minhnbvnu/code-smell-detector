function normalizePath(input) {
    if (!parentRegex.test(input))
      return normalizeSimplePath(input);
    let total = 1;
    while (parentRegex.test(input))
      total++;
    const uniqDirectory = `z${uniqInStr(input)}/`;
    const search = new RegExp(`^(?:${uniqDirectory})*`);
    const relative = normalizeSimplePath(uniqDirectory.repeat(total) + input);
    return relative.replace(search, (all) => {
      const leftover = all.length / uniqDirectory.length;
      return "../".repeat(total - leftover);
    });
  }