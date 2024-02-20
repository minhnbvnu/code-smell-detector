function toWordWidths(text) {
      return {
        text: text,
        width: measureText(text)
      };
    }