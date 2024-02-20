function _verify_symbol(sym) {
                var name = sym.name;
                if (is_in_generator() && name == "yield") {
                    token_error(sym.start, "Yield cannot be used as identifier inside generators");
                }
                if (S.input.has_directive("use strict")) {
                    if (name == "yield") {
                        token_error(sym.start, "Unexpected yield identifier inside strict mode");
                    }
                    if (sym instanceof AST_SymbolDeclaration && (name == "arguments" || name == "eval")) {
                        token_error(sym.start, "Unexpected " + name + " in strict mode");
                    }
                }
            }