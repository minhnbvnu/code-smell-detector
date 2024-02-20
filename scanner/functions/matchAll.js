function matchAll(re2, str) {
        let match;
        const matches = [];
        while (match = re2.exec(str)) {
          matches.push(match);
        }
        return matches;
      }