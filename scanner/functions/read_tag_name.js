function read_tag_name(parser) {
    const start = parser.index;
    if (parser.read(SELF)) {
      let i = parser.stack.length;
      let legal = false;
      while (i--) {
        const fragment2 = parser.stack[i];
        if (fragment2.type === "IfBlock" || fragment2.type === "EachBlock" || fragment2.type === "InlineComponent") {
          legal = true;
          break;
        }
      }
      if (!legal) {
        parser.error(parser_errors.invalid_self_placement, start);
      }
      return "svelte:self";
    }
    if (parser.read(COMPONENT))
      return "svelte:component";
    if (parser.read(ELEMENT))
      return "svelte:element";
    if (parser.read(SLOT))
      return "svelte:fragment";
    const name2 = parser.read_until(regex_whitespace_or_slash_or_closing_tag);
    if (meta_tags.has(name2))
      return name2;
    if (name2.startsWith("svelte:")) {
      const match = fuzzymatch(name2.slice(7), valid_meta_tags);
      parser.error(parser_errors.invalid_tag_name_svelte_element(valid_meta_tags, match), start);
    }
    if (!valid_tag_name.test(name2)) {
      parser.error(parser_errors.invalid_tag_name, start);
    }
    return name2;
  }