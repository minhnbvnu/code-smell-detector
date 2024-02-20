function parseMarkup(str) {
      return [
        {
          nodeName: "#text",
          textContent: str.toUpperCase(),
        },
      ];
    }