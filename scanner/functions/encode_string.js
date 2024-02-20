function encode_string(str, quote) {
                var ret = make_string(str, quote);
                if (options.inline_script) {
                    ret = ret.replace(/<\x2f(script)([>\/\t\n\f\r ])/gi, "<\\/$1$2");
                    ret = ret.replace(/\x3c!--/g, "\\x3c!--");
                    ret = ret.replace(/--\x3e/g, "--\\x3e");
                }
                return ret;
            }