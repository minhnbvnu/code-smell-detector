function parse_attribs(line) {
    var attributes = {},
        l = line.length,
        i, c,
        count = 1,
        quote = false,
        skip = false,
        open, close, joiner, seperator,
        pair = {
          start: 1,
          middle: null,
          end: null
        };

    if (!(l > 0 && (line.charAt(0) === '{' || line.charAt(0) === '('))) {
      return {
        _content: line[0] === ' ' ? line.substr(1, l) : line
      };
    }
    open = line.charAt(0);
    close = (open === '{') ? '}' : ')';
    joiner = (open === '{') ? ':' : '=';
    seperator = (open === '{') ? ',' : ' ';

    function process_pair() {
      if (typeof pair.start === 'number' &&
          typeof pair.middle === 'number' &&
          typeof pair.end === 'number') {
        var key = line.substr(pair.start, pair.middle - pair.start).trim(),
            value = line.substr(pair.middle + 1, pair.end - pair.middle - 1).trim();
        attributes[key] = value;
      }
      pair = {
        start: null,
        middle: null,
        end: null
      };
    }

    for (i = 1; count > 0; i += 1) {

      // If we reach the end of the line, then there is a problem
      if (i > l) {
        throw "Malformed attribute block";
      }

      c = line.charAt(i);
      if (skip) {
        skip = false;
      } else {
        if (quote) {
          if (c === '\\') {
            skip = true;
          }
          if (c === quote) {
            quote = false;
          }
        } else {
          if (c === '"' || c === "'") {
            quote = c;
          }

          if (count === 1) {
            if (c === joiner) {
              pair.middle = i;
            }
            if (c === seperator || c === close) {
              pair.end = i;
              process_pair();
              if (c === seperator) {
                pair.start = i + 1;
              }
            }
          }

          if (c === open || c === "(") {
            count += 1;
          }
          if (c === close || (count > 1 && c === ")")) {
            count -= 1;
          }
        }
      }
    }
    attributes._content = line.substr(i, line.length);
    return attributes;
  }