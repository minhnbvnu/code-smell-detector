function getCleanSource(src) {
        var newlineToken = '_!crlf!_';
        var newlineTokenPattern = new RegExp(newlineToken, 'g');
        var parsed, name, args, body;

        // parse the function source into name, arguments, and body
        // currently, names must by alphanumeric.
        parsed = src.replace(/\r?\n/g, newlineToken).
            match(/^function\s+([a-zA-Z_]\w*)?\s*\(([^)]*)\)\s*\{(.*)\}$/);
        if (!parsed) {
            throw 'Cannot parse function: ' +
                src.replace(newlineTokenPattern, '\n');
        }
        name = parsed[1] || '';
        args = parsed[2].split(/\s*,\s*/);
        body = parsed[3].replace(newlineTokenPattern, '\n');

        return ['function', name, '(', args.join(', '), ')', '{', body, '}'].join(' ');
    }