function straightenCurlyQuotesInsideAngleBrackets(text) {
  // This function's purpose is to fix quoted properties in HTML tags that were
  // typed into text blocks (Illustrator tends to automatically change single
  // and double quotes to curly quotes).
  // thanks to jashkenas
  // var quoteFinder = /[\u201C‘’\u201D]([^\n]*?)[\u201C‘’\u201D]/g;
  var tagFinder = /<[^\n]+?>/g;
  return text.replace(tagFinder, function(tag){
    return straightenCurlyQuotes(tag);
  });
}