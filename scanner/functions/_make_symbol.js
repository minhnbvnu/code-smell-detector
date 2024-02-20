function _make_symbol(type) {
                var name = S.token.value;
                return new (name == "this" ? AST_This :
                    name == "super" ? AST_Super :
                        type)({
                    name: String(name),
                    start: S.token,
                    end: S.token
                });
            }