function flush_tokenbuf() {
      if (tokenbuf.length > 0) {
        result[result.length-1].push(tokenbuf.join(""));
        tokenbuf = [];
      }
    }