function read_sequence(parser, done, location) {
    let current_chunk = {
      start: parser.index,
      end: null,
      type: "Text",
      raw: "",
      data: null
    };
    const chunks = [];
    function flush(end) {
      if (current_chunk.raw) {
        current_chunk.data = decode_character_references(current_chunk.raw, true);
        current_chunk.end = end;
        chunks.push(current_chunk);
      }
    }
    while (parser.index < parser.template.length) {
      const index = parser.index;
      if (done()) {
        flush(parser.index);
        return chunks;
      } else if (parser.eat("{")) {
        if (parser.match("#")) {
          const index2 = parser.index - 1;
          parser.eat("#");
          const name2 = parser.read_until(/[^a-z]/);
          parser.error(parser_errors.invalid_logic_block_placement(location, name2), index2);
        } else if (parser.match("@")) {
          const index2 = parser.index - 1;
          parser.eat("@");
          const name2 = parser.read_until(/[^a-z]/);
          parser.error(parser_errors.invalid_tag_placement(location, name2), index2);
        }
        flush(parser.index - 1);
        parser.allow_whitespace();
        const expression = read_expression(parser);
        parser.allow_whitespace();
        parser.eat("}", true);
        chunks.push({
          start: index,
          end: parser.index,
          type: "MustacheTag",
          expression
        });
        current_chunk = {
          start: parser.index,
          end: null,
          type: "Text",
          raw: "",
          data: null
        };
      } else {
        current_chunk.raw += parser.template[parser.index++];
      }
    }
    parser.error(parser_errors.unexpected_eof);
  }