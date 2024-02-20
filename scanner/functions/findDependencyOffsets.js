function *findDependencyOffsets() {
        const re = /(['"']).*?\1/g;
        let match;
        while ((match = re.exec(code))) {
          yield match.index;
        }
      }