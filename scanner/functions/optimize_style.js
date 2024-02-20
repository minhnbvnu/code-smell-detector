function optimize_style(value) {
    const props = [];
    let chunks = value.slice();
    while (chunks.length) {
      const chunk = chunks[0];
      if (chunk.type !== "Text")
        return null;
      const key_match = regex_style_prop_key.exec(chunk.data);
      if (!key_match)
        return null;
      const key = key_match[1];
      const offset2 = key_match.index + key_match[0].length;
      const remaining_data = chunk.data.slice(offset2);
      if (remaining_data) {
        chunks[0] = {
          start: chunk.start + offset2,
          end: chunk.end,
          type: "Text",
          data: remaining_data
        };
      } else {
        chunks.shift();
      }
      const result = get_style_value(chunks);
      props.push({ key, value: result.value, important: result.important });
      chunks = result.chunks;
    }
    return props;
  }