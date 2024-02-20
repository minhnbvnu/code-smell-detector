function createRegExp(string) {
  // Allow /regex/ syntax with optional last /
  if (string[0] === '/') {
    // Cut off first slash
    string = string.substring(1); // Cut off last slash, but only if it's there

    if (string[string.length - 1] === '/') {
      string = string.substring(0, string.length - 1);
    }

    try {
      return new RegExp(string, 'i');
    } catch (err) {
      // Bad regex. Make it not match anything.
      // TODO: maybe warn in console?
      return new RegExp('.^');
    }
  }

  function isLetter(char) {
    return char.toLowerCase() !== char.toUpperCase();
  }

  function matchAnyCase(char) {
    if (!isLetter(char)) {
      // Don't mess with special characters like [.
      return char;
    }

    return '[' + char.toLowerCase() + char.toUpperCase() + ']';
  } // 'item' should match 'Item' and 'ListItem', but not 'InviteMom'.
  // To do this, we'll slice off 'tem' and check first letter separately.


  const escaped = escape_string_regexp_default()(string);
  const firstChar = escaped[0];
  let restRegex = ''; // For 'item' input, restRegex becomes '[tT][eE][mM]'
  // We can't simply make it case-insensitive because first letter case matters.

  for (let i = 1; i < escaped.length; i++) {
    restRegex += matchAnyCase(escaped[i]);
  }

  if (!isLetter(firstChar)) {
    // We can't put a non-character like [ in a group
    // so we fall back to the simple case.
    return new RegExp(firstChar + restRegex);
  } // Construct a smarter regex.


  return new RegExp( // For example:
  // (^[iI]|I)[tT][eE][mM]
  // Matches:
  // 'Item'
  // 'ListItem'
  // but not 'InviteMom'
  '(^' + matchAnyCase(firstChar) + '|' + firstChar.toUpperCase() + ')' + restRegex);
}