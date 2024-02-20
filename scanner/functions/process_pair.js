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