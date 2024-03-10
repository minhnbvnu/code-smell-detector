function concise_method_or_getset(name, start, is_class) {
                const get_symbol_ast = (name, SymbolClass = AST_SymbolMethod) => {
                    if (typeof name === "string" || typeof name === "number") {
                        return new SymbolClass({
                            start,
                            name: "" + name,
                            end: prev()
                        });
                    }
                    else if (name === null) {
                        unexpected();
                    }
                    return name;
                };
                const is_not_method_start = () => !is("punc", "(") && !is("punc", ",") && !is("punc", "}") && !is("punc", ";") && !is("operator", "=");
                var is_async = false;
                var is_static = false;
                var is_generator = false;
                var is_private = false;
                var accessor_type = null;
                if (is_class && name === "static" && is_not_method_start()) {
                    const static_block = class_static_block();
                    if (static_block != null) {
                        return static_block;
                    }
                    is_static = true;
                    name = as_property_name();
                }
                if (name === "async" && is_not_method_start()) {
                    is_async = true;
                    name = as_property_name();
                }
                if (prev().type === "operator" && prev().value === "*") {
                    is_generator = true;
                    name = as_property_name();
                }
                if ((name === "get" || name === "set") && is_not_method_start()) {
                    accessor_type = name;
                    name = as_property_name();
                }
                if (prev().type === "privatename") {
                    is_private = true;
                }
                const property_token = prev();
                if (accessor_type != null) {
                    if (!is_private) {
                        const AccessorClass = accessor_type === "get"
                            ? AST_ObjectGetter
                            : AST_ObjectSetter;
                        name = get_symbol_ast(name);
                        return new AccessorClass({
                            start,
                            static: is_static,
                            key: name,
                            quote: name instanceof AST_SymbolMethod ? property_token.quote : undefined,
                            value: create_accessor(),
                            end: prev()
                        });
                    }
                    else {
                        const AccessorClass = accessor_type === "get"
                            ? AST_PrivateGetter
                            : AST_PrivateSetter;
                        return new AccessorClass({
                            start,
                            static: is_static,
                            key: get_symbol_ast(name),
                            value: create_accessor(),
                            end: prev(),
                        });
                    }
                }
                if (is("punc", "(")) {
                    name = get_symbol_ast(name);
                    const AST_MethodVariant = is_private
                        ? AST_PrivateMethod
                        : AST_ConciseMethod;
                    var node = new AST_MethodVariant({
                        start: start,
                        static: is_static,
                        is_generator: is_generator,
                        async: is_async,
                        key: name,
                        quote: name instanceof AST_SymbolMethod ?
                            property_token.quote : undefined,
                        value: create_accessor(is_generator, is_async),
                        end: prev()
                    });
                    return node;
                }
                if (is_class) {
                    const key = get_symbol_ast(name, AST_SymbolClassProperty);
                    const quote = key instanceof AST_SymbolClassProperty
                        ? property_token.quote
                        : undefined;
                    const AST_ClassPropertyVariant = is_private
                        ? AST_ClassPrivateProperty
                        : AST_ClassProperty;
                    if (is("operator", "=")) {
                        next();
                        return new AST_ClassPropertyVariant({
                            start,
                            static: is_static,
                            quote,
                            key,
                            value: expression(false),
                            end: prev()
                        });
                    }
                    else if (is("name")
                        || is("privatename")
                        || is("operator", "*")
                        || is("punc", ";")
                        || is("punc", "}")) {
                        return new AST_ClassPropertyVariant({
                            start,
                            static: is_static,
                            quote,
                            key,
                            end: prev()
                        });
                    }
                }
            }