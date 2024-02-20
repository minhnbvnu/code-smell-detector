function matchRecursive(str, prefix, startChar = '(', endChar = ')') {
  let match;
  let start = 0;
  let input = str;
  let matches = [];

  while ((match = (input = str.slice(start)).match(prefix)) != null) {
    let endOffset = match.index + match[0].length;
    let counter = 1;
    let skipUntil = '';
    let i = endOffset;

    for (; i < input.length; i++) {
      let c = input[i];
      if (counter === 0) {
        break;
      }

      if (c === skipUntil) {
        skipUntil = '';
      } else if (c === '"') {
        skipUntil = '"';
      } else if (c === "'") {
        skipUntil = "'";
      } else if (c === startChar) {
        counter++;
      } else if (c === endChar) {
        counter--;
      }
    }

    if (counter === 0) {
      matches.push(input.slice(endOffset, i - 1));
    }

    start += endOffset;
  }

  return matches;
}