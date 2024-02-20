function emphasis (text) {
    return text
      .replace(/'''(.*?)'''/g, '<strong>$1<\/strong>')
      .replace(/''(.*?)''/g, '<em>$1<\/em>')
      .replace(/^-----*/, '<hr>')
  }