function adjustText(prefix, text) {
        return String(text)
          .split('\n')
          .map(item => (item ? prefix + item : item))
          .join('\n');
      }