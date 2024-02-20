function findQuotes(quoteSymbol) {
    const quotes = [];
    const addQuote = (_, index) => {
      quotes.push({ from: index, to: index + _.length });
      return _;
    };
    const regEx = new RegExp(quoteSymbol + '.*' + quoteSymbol);
    cmd.replace(regEx, addQuote);
    return quotes;
  }