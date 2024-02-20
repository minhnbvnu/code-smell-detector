function set_header(args) {
        for (var i = 0; i < args.length; i += 2) {
            if (typeof args[i] === 'string' &&
                typeof args[i + 1] === 'string') {
                header[args[i]] = args[i + 1];
            }
        }
        return header;
    }