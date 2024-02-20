function get_header(header, credentials, opts) {
        var type = header.split(' ')[0], user = credentials[0], pass = credentials[1];
        if (type == 'Digest') {
            return digest.generate(header, user, pass, opts.method, opts.path);
        }
        else if (type == 'Basic') {
            return basic(user, pass);
        }
    }