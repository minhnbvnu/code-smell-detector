function quoteForCmd(text, forceQuote) {
  let caretDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  // See the below blog post for an explanation of this function and
  // quoteForWin32:
  // https://blogs.msdn.microsoft.com/twistylittlepassagesallalike/2011/04/23/everyone-quotes-command-line-arguments-the-wrong-way/
  if (!text.length) {
    return '""';
  }
  if (/[\n\r]/.test(text)) {
    throw new Error("Line breaks can't be quoted on Windows");
  }
  const caretEscape = /["%]/.test(text);
  text = quoteForWin32(text, forceQuote || !caretEscape && /[&()<>^|]/.test(text));
  if (caretEscape) {
    // See Win32Context for explanation of what caretDepth is for.
    do {
      text = text.replace(/[\t "%&()<>^|]/g, '^$&');
    } while (caretDepth--);
  }
  return text;
}