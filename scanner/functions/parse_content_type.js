function parse_content_type(header) {
        if (!header || header === '')
            return {};
        var found, charset = 'utf8', arr = header.split(';');
        if (arr.length > 1 && (found = arr[1].match(/charset=(.+)/)))
            charset = found[1];
        return { type: arr[0], charset: charset };
    }