function atdocument() {
            var pos = position();
            var m = match(/^@([-\w]+)?document *([^{]+)/);
            if (!m)
                return;
            var vendor = trim(m[1]);
            var doc = trim(m[2]);
            if (!open())
                return error("@document missing '{'");
            var style = comments().concat(rules());
            if (!close())
                return error("@document missing '}'");
            return pos({
                type: 'document',
                document: doc,
                vendor: vendor,
                rules: style
            });
        }