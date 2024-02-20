function getReplacement(match, str) {
        if (typeof replacement === "string") {
          return replacement.replace(/\$(\$|&|\d+)/g, (_2, i) => {
            if (i === "$")
              return "$";
            if (i === "&")
              return match[0];
            const num = +i;
            if (num < match.length)
              return match[+i];
            return `$${i}`;
          });
        } else {
          return replacement(...match, match.index, str, match.groups);
        }
      }