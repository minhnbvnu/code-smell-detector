function regexp_source_fix(source) {
            // V8 does not escape line terminators in regexp patterns in node 12
            // We'll also remove literal \0
            return source.replace(/[\0\n\r\u2028\u2029]/g, function (match, offset) {
                var escaped = source[offset - 1] == "\\"
                    && (source[offset - 2] != "\\"
                        || /(?:^|[^\\])(?:\\{2})*$/.test(source.slice(0, offset - 1)));
                return (escaped ? "" : "\\") + lineTerminatorEscape[match];
            });
        }