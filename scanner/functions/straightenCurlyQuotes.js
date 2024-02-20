function straightenCurlyQuotes(str) {
  return str.replace( /[\u201C\u201D]/g , '"' ).replace( /[‘’]/g , "'" );
}