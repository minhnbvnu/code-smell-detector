function extract_svelte_ignore(text2) {
    const match = regex_svelte_ignore.exec(text2);
    return match ? match[1].split(regex_whitespace).map((x2) => x2.trim()).filter(Boolean) : [];
  }