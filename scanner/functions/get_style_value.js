function get_style_value(chunks) {
    const value = [];
    let in_url = false;
    let quote_mark = null;
    let escaped2 = false;
    let closed = false;
    while (chunks.length && !closed) {
      const chunk = chunks.shift();
      if (chunk.type === "Text") {
        let c2 = 0;
        while (c2 < chunk.data.length) {
          const char = chunk.data[c2];
          if (escaped2) {
            escaped2 = false;
          } else if (char === "\\") {
            escaped2 = true;
          } else if (char === quote_mark) {
            quote_mark = null;
          } else if (char === '"' || char === "'") {
            quote_mark = char;
          } else if (char === ")" && in_url) {
            in_url = false;
          } else if (char === "u" && chunk.data.slice(c2, c2 + 4) === "url(") {
            in_url = true;
          } else if (char === ";" && !in_url && !quote_mark) {
            closed = true;
            break;
          }
          c2 += 1;
        }
        if (c2 > 0) {
          value.push({
            type: "Text",
            start: chunk.start,
            end: chunk.start + c2,
            data: chunk.data.slice(0, c2)
          });
        }
        while (regex_semicolon_or_whitespace.test(chunk.data[c2]))
          c2 += 1;
        const remaining_data = chunk.data.slice(c2);
        if (remaining_data) {
          chunks.unshift({
            start: chunk.start + c2,
            end: chunk.end,
            type: "Text",
            data: remaining_data
          });
          break;
        }
      } else {
        value.push(chunk);
      }
    }
    let important = false;
    const last_chunk = value[value.length - 1];
    if (last_chunk && last_chunk.type === "Text" && regex_important_flag.test(last_chunk.data)) {
      important = true;
      last_chunk.data = last_chunk.data.replace(regex_important_flag, "");
      if (!last_chunk.data)
        value.pop();
    }
    return {
      chunks,
      value,
      important
    };
  }