function get_relative_path(from, to2) {
    const from_parts = from.split(/[/\\]/);
    const to_parts = to2.split(/[/\\]/);
    from_parts.pop();
    while (from_parts[0] === to_parts[0]) {
      from_parts.shift();
      to_parts.shift();
    }
    if (from_parts.length) {
      let i = from_parts.length;
      while (i--)
        from_parts[i] = "..";
    }
    return from_parts.concat(to_parts).join("/");
  }