function toNumberString(str, decimalChar = '.') {
    // Special case if user types the decimal char
    if (str === decimalChar) {
      return '';
    }

    // If its a number we always use dot notation
    if (typeof str === 'number') {
      return `${str}`
        .split('.')
        .map(splitStr => stripNonNumeric(splitStr))
        .join('.');
    }

    // Create a regex to replace all but the first occurrence of the decimalChar.
    // let regex = new RegExp(`(.*?\\${decimalChar}.*?)\\${decimalChar}(.*)`, 'g');

    return (
      `${str}`
        // .replace(regex, '$1$2')
        .split(decimalChar)
        .map(splitStr => stripNonNumeric(splitStr))
        .join('.')
    );
  }