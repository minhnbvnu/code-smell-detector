function yieldStatement(stream) {
    if (stream.match(/^yield\b/)) {
        return 'keyword';
    }
  }