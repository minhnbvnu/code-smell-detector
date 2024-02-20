function do_attribute(a, v) {
        var u, x;
        if (a === 'id') {
            u = typeof v === 'string' ? v.toUpperCase() : '';
            if (ids[u] === true) {
                warn('duplicate_a', next_token, v);
            }
            if (!/^[A-Za-z][A-Za-z0-9._:\-]*$/.test(v)) {
                warn('bad_id_a', next_token, v);
            } else if (option.adsafe) {
                if (adsafe_id) {
                    if (v.slice(0, adsafe_id.length) !== adsafe_id) {
                        warn('adsafe_prefix_a', next_token, adsafe_id);
                    } else if (!/^[A-Z]+_[A-Z]+$/.test(v)) {
                        warn('adsafe_bad_id');
                    }
                } else {
                    adsafe_id = v;
                    if (!/^[A-Z]+_$/.test(v)) {
                        warn('adsafe_bad_id');
                    }
                }
            }
            x = v.search(dx);
            if (x >= 0) {
                warn('unexpected_char_a_b', token, v.charAt(x), a);
            }
            ids[u] = true;
        } else if (a === 'class' || a === 'type' || a === 'name') {
            x = v.search(qx);
            if (x >= 0) {
                warn('unexpected_char_a_b', token, v.charAt(x), a);
            }
            ids[u] = true;
        } else if (a === 'href' || a === 'background' ||
                a === 'content' || a === 'data' ||
                a.indexOf('src') >= 0 || a.indexOf('url') >= 0) {
            if (option.safe && ux.test(v)) {
                stop('bad_url_a', next_token, v);
            }
            urls.push(v);
        } else if (a === 'for') {
            if (option.adsafe) {
                if (adsafe_id) {
                    if (v.slice(0, adsafe_id.length) !== adsafe_id) {
                        warn('adsafe_prefix_a', next_token, adsafe_id);
                    } else if (!/^[A-Z]+_[A-Z]+$/.test(v)) {
                        warn('adsafe_bad_id');
                    }
                } else {
                    warn('adsafe_bad_id');
                }
            }
        } else if (a === 'name') {
            if (option.adsafe && v.indexOf('_') >= 0) {
                warn('adsafe_name_a', next_token, v);
            }
        }
    }