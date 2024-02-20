function encodeString(source) {
                if (/["\\\x00-\x1f]/.test(source)) {
                    source = source.replace(
                        /["\\\x00-\x1f]/g,
                        function (match) {
                            var c = escapeMap[match];
                            if (c) {
                                return c;
                            }
                            c = match.charCodeAt();
                            return "\\u00"
                            + Math.floor(c / 16).toString(16)
                            + (c % 16).toString(16);
                        });
                }
                return '"' + source + '"';
            }