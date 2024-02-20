function css_url() {
        var c, url;
        if (next_token.identifier && next_token.string === 'url') {
            next_token = lex.range('(', ')');
            url = next_token.string;
            c = url.charAt(0);
            if (c === '"' || c === '\'') {
                if (url.slice(-1) !== c) {
                    warn('bad_url_a');
                } else {
                    url = url.slice(1, -1);
                    if (url.indexOf(c) >= 0) {
                        warn('bad_url_a');
                    }
                }
            }
            if (!url) {
                warn('missing_url');
            }
            if (ux.test(url)) {
                stop('bad_url_a');
            }
            urls.push(url);
            advance();
            return true;
        }
        return false;
    }