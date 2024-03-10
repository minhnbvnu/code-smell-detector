function brackets(str) {
  if (!isPosixBracket(str)) {
    return str;
  }

  var negated = false;
  if (str.indexOf('[^') !== -1) {
    negated = true;
    str = str.split('[^').join('[');
  }
  if (str.indexOf('[!') !== -1) {
    negated = true;
    str = str.split('[!').join('[');
  }

  var a = str.split('[');
  var b = str.split(']');
  var imbalanced = a.length !== b.length;

  var parts = str.split(/(?::\]\[:|\[?\[:|:\]\]?)/);
  var len = parts.length, i = 0;
  var end = '', beg = '';
  var res = [];

  // start at the end (innermost) first
  while (len--) {
    var inner = parts[i++];
    if (inner === '^[!' || inner === '[!') {
      inner = '';
      negated = true;
    }

    var prefix = negated ? '^' : '';
    var ch = POSIX[inner];

    if (ch) {
      res.push('[' + prefix + ch + ']');
    } else if (inner) {
      if (/^\[?\w-\w\]?$/.test(inner)) {
        if (i === parts.length) {
          res.push('[' + prefix + inner);
        } else if (i === 1) {
          res.push(prefix + inner + ']');
        } else {
          res.push(prefix + inner);
        }
      } else {
        if (i === 1) {
          beg += inner;
        } else if (i === parts.length) {
          end += inner;
        } else {
          res.push('[' + prefix + inner + ']');
        }
      }
    }
  }

  var result = res.join('|');
  var rlen = res.length || 1;
  if (rlen > 1) {
    result = '(?:' + result + ')';
    rlen = 1;
  }
  if (beg) {
    rlen++;
    if (beg.charAt(0) === '[') {
      if (imbalanced) {
        beg = '\\[' + beg.slice(1);
      } else {
        beg += ']';
      }
    }
    result = beg + result;
  }
  if (end) {
    rlen++;
    if (end.slice(-1) === ']') {
      if (imbalanced) {
        end = end.slice(0, end.length - 1) + '\\]';
      } else {
        end = '[' + end;
      }
    }
    result += end;
  }

  if (rlen > 1) {
    result = result.split('][').join(']|[');
    if (result.indexOf('|') !== -1 && !/\(\?/.test(result)) {
      result = '(?:' + result + ')';
    }
  }

  result = result.replace(/\[+=|=\]+/g, '\\b');
  return result;
}