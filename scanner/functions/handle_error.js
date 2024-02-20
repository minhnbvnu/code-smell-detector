function handle_error(str, err) {
    re.lastIndex = 0;
    str = str.replace(re, (m, i, at3, hash2, name2) => {
      if (at3)
        return `@${name2}`;
      if (hash2)
        return `#${name2}`;
      return "${...}";
    });
    console.log(`failed to parse:
${str}`);
    throw err;
  }