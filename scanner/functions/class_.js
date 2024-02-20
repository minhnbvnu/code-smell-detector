function class_(KindOfClass, is_export_default) {
                var start, method, class_name, extends_, a = [];
                S.input.push_directives_stack(); // Push directive stack, but not scope stack
                S.input.add_directive("use strict");
                if (S.token.type == "name" && S.token.value != "extends") {
                    class_name = as_symbol(KindOfClass === AST_DefClass ? AST_SymbolDefClass : AST_SymbolClass);
                }
                if (KindOfClass === AST_DefClass && !class_name) {
                    if (is_export_default) {
                        KindOfClass = AST_ClassExpression;
                    }
                    else {
                        unexpected();
                    }
                }
                if (S.token.value == "extends") {
                    next();
                    extends_ = expression(true);
                }
                expect("{");
                // mark in class feild,
                const save_in_class = S.in_class;
                S.in_class = true;
                while (is("punc", ";")) {
                    next();
                } // Leading semicolons are okay in class bodies.
                while (!is("punc", "}")) {
                    start = S.token;
                    method = concise_method_or_getset(as_property_name(), start, true);
                    if (!method) {
                        unexpected();
                    }
                    a.push(method);
                    while (is("punc", ";")) {
                        next();
                    }
                }
                // mark in class feild,
                S.in_class = save_in_class;
                S.input.pop_directives_stack();
                next();
                return new KindOfClass({
                    start: start,
                    name: class_name,
                    extends: extends_,
                    properties: a,
                    end: prev(),
                });
            }