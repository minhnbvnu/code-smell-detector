function set_css_all( str1, str2 ) {
        return set_css(prefixes.join(str1 + ';') + ( str2 || '' ));
    }