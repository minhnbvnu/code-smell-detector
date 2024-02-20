function mangle_properties(ast, options) {
            options = defaults(options, {
                builtins: false,
                cache: null,
                debug: false,
                keep_quoted: false,
                nth_identifier: base54,
                only_cache: false,
                regex: null,
                reserved: null,
                undeclared: false,
            }, true);
            var nth_identifier = options.nth_identifier;
            var reserved_option = options.reserved;
            if (!Array.isArray(reserved_option))
                reserved_option = [reserved_option];
            var reserved = new Set(reserved_option);
            if (!options.builtins)
                find_builtins(reserved);
            var cname = -1;
            var cache;
            if (options.cache) {
                cache = options.cache.props;
            }
            else {
                cache = new Map();
            }
            var regex = options.regex && new RegExp(options.regex);
            // note debug is either false (disabled), or a string of the debug suffix to use (enabled).
            // note debug may be enabled as an empty string, which is falsey. Also treat passing 'true'
            // the same as passing an empty string.
            var debug = options.debug !== false;
            var debug_name_suffix;
            if (debug) {
                debug_name_suffix = (options.debug === true ? "" : options.debug);
            }
            var names_to_mangle = new Set();
            var unmangleable = new Set();
            // Track each already-mangled name to prevent nth_identifier from generating
            // the same name.
            cache.forEach((mangled_name) => unmangleable.add(mangled_name));
            var keep_quoted = !!options.keep_quoted;
            // step 1: find candidates to mangle
            ast.walk(new TreeWalker(function (node) {
                if (node instanceof AST_ClassPrivateProperty
                    || node instanceof AST_PrivateMethod
                    || node instanceof AST_PrivateGetter
                    || node instanceof AST_PrivateSetter
                    || node instanceof AST_DotHash)
                    ;
                else if (node instanceof AST_ObjectKeyVal) {
                    if (typeof node.key == "string" && (!keep_quoted || !node.quote)) {
                        add(node.key);
                    }
                }
                else if (node instanceof AST_ObjectProperty) {
                    // setter or getter, since KeyVal is handled above
                    if (!keep_quoted || !node.quote) {
                        add(node.key.name);
                    }
                }
                else if (node instanceof AST_Dot) {
                    var declared = !!options.undeclared;
                    if (!declared) {
                        var root = node;
                        while (root.expression) {
                            root = root.expression;
                        }
                        declared = !(root.thedef && root.thedef.undeclared);
                    }
                    if (declared &&
                        (!keep_quoted || !node.quote)) {
                        add(node.property);
                    }
                }
                else if (node instanceof AST_Sub) {
                    if (!keep_quoted) {
                        addStrings(node.property, add);
                    }
                }
                else if (node instanceof AST_Call
                    && node.expression.print_to_string() == "Object.defineProperty") {
                    addStrings(node.args[1], add);
                }
                else if (node instanceof AST_Binary && node.operator === "in") {
                    addStrings(node.left, add);
                }
            }));
            // step 2: transform the tree, renaming properties
            return ast.transform(new TreeTransformer(function (node) {
                if (node instanceof AST_ClassPrivateProperty
                    || node instanceof AST_PrivateMethod
                    || node instanceof AST_PrivateGetter
                    || node instanceof AST_PrivateSetter
                    || node instanceof AST_DotHash)
                    ;
                else if (node instanceof AST_ObjectKeyVal) {
                    if (typeof node.key == "string" && (!keep_quoted || !node.quote)) {
                        node.key = mangle(node.key);
                    }
                }
                else if (node instanceof AST_ObjectProperty) {
                    // setter, getter, method or class field
                    if (!keep_quoted || !node.quote) {
                        node.key.name = mangle(node.key.name);
                    }
                }
                else if (node instanceof AST_Dot) {
                    if (!keep_quoted || !node.quote) {
                        node.property = mangle(node.property);
                    }
                }
                else if (!keep_quoted && node instanceof AST_Sub) {
                    node.property = mangleStrings(node.property);
                }
                else if (node instanceof AST_Call
                    && node.expression.print_to_string() == "Object.defineProperty") {
                    node.args[1] = mangleStrings(node.args[1]);
                }
                else if (node instanceof AST_Binary && node.operator === "in") {
                    node.left = mangleStrings(node.left);
                }
            }));
            // only function declarations after this line
            function can_mangle(name) {
                if (unmangleable.has(name))
                    return false;
                if (reserved.has(name))
                    return false;
                if (options.only_cache) {
                    return cache.has(name);
                }
                if (/^-?[0-9]+(\.[0-9]+)?(e[+-][0-9]+)?$/.test(name))
                    return false;
                return true;
            }
            function should_mangle(name) {
                if (regex && !regex.test(name))
                    return false;
                if (reserved.has(name))
                    return false;
                return cache.has(name)
                    || names_to_mangle.has(name);
            }
            function add(name) {
                if (can_mangle(name))
                    names_to_mangle.add(name);
                if (!should_mangle(name)) {
                    unmangleable.add(name);
                }
            }
            function mangle(name) {
                if (!should_mangle(name)) {
                    return name;
                }
                var mangled = cache.get(name);
                if (!mangled) {
                    if (debug) {
                        // debug mode: use a prefix and suffix to preserve readability, e.g. o.foo -> o._$foo$NNN_.
                        var debug_mangled = "_$" + name + "$" + debug_name_suffix + "_";
                        if (can_mangle(debug_mangled)) {
                            mangled = debug_mangled;
                        }
                    }
                    // either debug mode is off, or it is on and we could not use the mangled name
                    if (!mangled) {
                        do {
                            mangled = nth_identifier.get(++cname);
                        } while (!can_mangle(mangled));
                    }
                    cache.set(name, mangled);
                }
                return mangled;
            }
            function mangleStrings(node) {
                return node.transform(new TreeTransformer(function (node) {
                    if (node instanceof AST_Sequence) {
                        var last = node.expressions.length - 1;
                        node.expressions[last] = mangleStrings(node.expressions[last]);
                    }
                    else if (node instanceof AST_String) {
                        node.value = mangle(node.value);
                    }
                    else if (node instanceof AST_Conditional) {
                        node.consequent = mangleStrings(node.consequent);
                        node.alternative = mangleStrings(node.alternative);
                    }
                    return node;
                }));
            }
        }