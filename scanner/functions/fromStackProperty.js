function fromStackProperty(stackString) {
  let chrome =
    /^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
  let gecko =
    /^\s*(\S*)(?:\((.*?)\))?@((?:file|http|https).*?):(\d+)(?::(\d+))?\s*$/i;
  let lines = stackString.split('\n');
  let stack = [];
  let parts;

  for (let i = 0, j = lines.length; i < j; ++i) {
    if ((parts = gecko.exec(lines[i]))) {
      stack.push({
        url: parts[3],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: parts[2] ? parts[2].split(',') : '',
        line: +parts[4],
        column: parts[5] ? +parts[5] : null,
      });
    } else if ((parts = chrome.exec(lines[i]))) {
      stack.push({
        url: parts[2],
        func: parts[1] || UNKNOWN_FUNCTION,
        line: +parts[3],
        column: parts[4] ? +parts[4] : null,
      });
    }
  }

  return stack.length ? stack : null;
}