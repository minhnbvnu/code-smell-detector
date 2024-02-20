function declarations() {
            var decls = [];
            if (!open())
                return error("missing '{'");
            comments(decls);
            // declarations
            var decl;
            while (decl = declaration()) {
                if (decl !== false) {
                    decls.push(decl);
                    comments(decls);
                }
            }
            if (!close())
                return error("missing '}'");
            return decls;
        }