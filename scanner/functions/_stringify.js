function _stringify(val) {
    switch (exports.type(val)) {
      case 'null':
      case 'undefined':
        val = '[' + val + ']';
        break;
      case 'array':
      case 'object':
        val = jsonStringify(val, spaces, depth + 1);
        break;
      case 'boolean':
      case 'regexp':
      case 'number':
        val = val === 0 && (1/val) === -Infinity // `-0`
          ? '-0'
          : val.toString();
        break;
      case 'date':
        val = '[Date: ' + val.toISOString() + ']';
        break;
      case 'buffer':
        var json = val.toJSON();
        // Based on the toJSON result
        json = json.data && json.type ? json.data : json;
        val = '[Buffer: ' + jsonStringify(json, 2, depth + 1) + ']';
        break;
      default:
        val = (val == '[Function]' || val == '[Circular]')
          ? val
          : '"' + val + '"'; //string
    }
    return val;
  }