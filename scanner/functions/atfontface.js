function atfontface() {
            var pos = position();
            var m = match(/^@font-face\s*/);
            if (!m)
                return;
            if (!open())
                return error("@font-face missing '{'");
            var decls = comments();
            // declarations
            var decl;
            while (decl = declaration()) {
                decls.push(decl);
                decls = decls.concat(comments());
            }
            if (!close())
                return error("@font-face missing '}'");
            return pos({
                type: 'font-face',
                declarations: decls
            });
        }