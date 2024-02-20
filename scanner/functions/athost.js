function athost() {
            var pos = position();
            var m = match(/^@host\s*/);
            if (!m)
                return;
            if (!open())
                return error("@host missing '{'");
            var style = comments().concat(rules());
            if (!close())
                return error("@host missing '}'");
            return pos({
                type: 'host',
                rules: style
            });
        }