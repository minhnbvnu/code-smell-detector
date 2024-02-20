function make_string(str, quote) {
                var dq = 0, sq = 0;
                str = str.replace(/[\\\b\f\n\r\v\t\x22\x27\u2028\u2029\0\ufeff]/g, function (s, i) {
                    switch (s) {
                        case '"':
                            ++dq;
                            return '"';
                        case "'":
                            ++sq;
                            return "'";
                        case "\\": return "\\\\";
                        case "\n": return "\\n";
                        case "\r": return "\\r";
                        case "\t": return "\\t";
                        case "\b": return "\\b";
                        case "\f": return "\\f";
                        case "\x0B": return options.ie8 ? "\\x0B" : "\\v";
                        case "\u2028": return "\\u2028";
                        case "\u2029": return "\\u2029";
                        case "\ufeff": return "\\ufeff";
                        case "\0":
                            return /[0-9]/.test(get_full_char(str, i + 1)) ? "\\x00" : "\\0";
                    }
                    return s;
                });
                function quote_single() {
                    return "'" + str.replace(/\x27/g, "\\'") + "'";
                }
                function quote_double() {
                    return '"' + str.replace(/\x22/g, '\\"') + '"';
                }
                function quote_template() {
                    return "`" + str.replace(/`/g, "\\`") + "`";
                }
                str = to_utf8(str);
                if (quote === "`")
                    return quote_template();
                switch (options.quote_style) {
                    case 1:
                        return quote_single();
                    case 2:
                        return quote_double();
                    case 3:
                        return quote == "'" ? quote_single() : quote_double();
                    default:
                        return dq > sq ? quote_single() : quote_double();
                }
            }