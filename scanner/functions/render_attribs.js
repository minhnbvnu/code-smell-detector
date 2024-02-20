function render_attribs(attribs) {
    var key, value, result = [];
    for (key in attribs) {
      if (key[key.length - 1] == "?") {
        value = escaperName + '(' + attribs[key] + ')';
        result.push('" + ('  + attribs[key] + ' ? " ' + key.replace('?', '') + '=\\"" + ' + value + ' + "\\"" : "") + "');
        continue;
      }
      if (key !== '_content' && attribs.hasOwnProperty(key)) {
        switch (attribs[key]) {
        case 'undefined':
        case 'false':
        case 'null':
        case '""':
          break;
        default:
          try {
            value = JSON.parse("[" + attribs[key] +"]")[0];
            if (value === true) {
              value = key;
            } else if (typeof value === 'string' && embedder.test(value)) {
              value = '" +\n' + parse_interpol(html_escape(value)) + ' +\n"';
            } else {
              value = html_escape(value);
            }
            result.push(" " + key + '=\\"' + value + '\\"');
          } catch (e) {
            result.push(" " + key + '=\\"" + '+escaperName+'(' + attribs[key] + ') + "\\"');
          }
        }
      }
    }
    return result.join("");
  }