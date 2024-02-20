function is_identifier_string(str, allow_surrogates) {
            if (BASIC_IDENT.test(str)) {
                return true;
            }
            if (!allow_surrogates && /[\ud800-\udfff]/.test(str)) {
                return false;
            }
            var match = UNICODE.ID_Start.exec(str);
            if (!match || match.index !== 0) {
                return false;
            }
            str = str.slice(match[0].length);
            if (!str) {
                return true;
            }
            match = UNICODE.ID_Continue.exec(str);
            return !!match && match[0].length === str.length;
        }