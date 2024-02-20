function addText(text) {
      if (!text) {
        return;
      }
      html.push(sanitizeText(text));
    }