function atsupports() {
            var pos = position();
            var m = match(/^@supports *([^{]+)/);
            if (!m)
                return;
            var supports = trim(m[1]);
            if (!open())
                return error("@supports missing '{'");
            var style = comments().concat(rules());
            if (!close())
                return error("@supports missing '}'");
            return pos({
                type: 'supports',
                supports: supports,
                rules: style
            });
        }