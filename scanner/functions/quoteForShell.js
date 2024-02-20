function quoteForShell(text, forceQuote, platform) {
  return Formatter.for(platform).quote(text, forceQuote);
}