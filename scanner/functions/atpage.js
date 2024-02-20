function atpage() {
            var pos = position();
            var m = match(/^@page */);
            if (!m)
                return;
            var sel = selector() || [];
            if (!open())
                return error("@page missing '{'");
            var decls = comments();
            // declarations
            var decl;
            while (decl = declaration()) {
                decls.push(decl);
                decls = decls.concat(comments());
            }
            if (!close())
                return error("@page missing '}'");
            return pos({
                type: 'page',
                selectors: sel,
                declarations: decls
            });
        }