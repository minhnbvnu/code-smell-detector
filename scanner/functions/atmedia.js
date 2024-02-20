function atmedia() {
            var pos = position();
            var m = match(/^@media *([^{]+)/);
            if (!m)
                return;
            var media = trim(m[1]);
            if (!open())
                return error("@media missing '{'");
            var style = comments().concat(rules());
            if (!close())
                return error("@media missing '}'");
            return pos({
                type: 'media',
                media: media,
                rules: style
            });
        }