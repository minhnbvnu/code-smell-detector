function do_begin(n) {
        if (n !== 'html' && !option.fragment) {
            if (n === 'div' && option.adsafe) {
                stop('adsafe_fragment');
            } else {
                stop('expected_a_b', token, 'html', n);
            }
        }
        if (option.adsafe) {
            if (n === 'html') {
                stop('adsafe_html', token);
            }
            if (option.fragment) {
                if (n !== 'div') {
                    stop('adsafe_div', token);
                }
            } else {
                stop('adsafe_fragment', token);
            }
        }
        option.browser = true;
    }