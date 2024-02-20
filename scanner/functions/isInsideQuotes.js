function isInsideQuotes(index) {
    return quotes.reduce((result, quote) => {
      return result || quote.from <= index && index <= quote.to;
    }, false);
  }