function chop(text, maxLength) {
    return text.length <= maxLength ? text : text.substr(0, 27) + '...';
  }