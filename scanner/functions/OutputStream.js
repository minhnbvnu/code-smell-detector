function OutputStream(options) {
            var readonly = !options;
            options = defaults(options, {
                ascii_only: false,
                beautify: false,
                braces: false,
                comments: "some",
                ecma: 5,
                ie8: false,
                indent_level: 4,
                indent_start: 0,
                inline_script: true,
                keep_numbers: false,
                keep_quoted_props: false,
                max_line_len: false,
                preamble: null,
                preserve_annotations: false,
                quote_keys: false,
                quote_style: 0,
                safari10: false,
                semicolons: true,
                shebang: true,
                shorthand: undefined,
                source_map: null,
                webkit: false,
                width: 80,
                wrap_iife: false,
                wrap_func_args: true,
                _destroy_ast: false
            }, true);
            if (options.shorthand === undefined)
                options.shorthand = options.ecma > 5;
            // Convert comment option to RegExp if necessary and set up comments filter
            var comment_filter = return_false; // Default case, throw all comments away
            if (options.comments) {
                let comments = options.comments;
                if (typeof options.comments === "string" && /^\/.*\/[a-zA-Z]*$/.test(options.comments)) {
                    var regex_pos = options.comments.lastIndexOf("/");
                    comments = new RegExp(options.comments.substr(1, regex_pos - 1), options.comments.substr(regex_pos + 1));
                }
                if (comments instanceof RegExp) {
                    comment_filter = function (comment) {
                        return comment.type != "comment5" && comments.test(comment.value);
                    };
                }
                else if (typeof comments === "function") {
                    comment_filter = function (comment) {
                        return comment.type != "comment5" && comments(this, comment);
                    };
                }
                else if (comments === "some") {
                    comment_filter = is_some_comments;
                }
                else { // NOTE includes "all" option
                    comment_filter = return_true;
                }
            }
            var indentation = 0;
            var current_col = 0;
            var current_line = 1;
            var current_pos = 0;
            var OUTPUT = new Rope();
            let printed_comments = new Set();
            var to_utf8 = options.ascii_only ? function (str, identifier = false, regexp = false) {
                if (options.ecma >= 2015 && !options.safari10 && !regexp) {
                    str = str.replace(/[\ud800-\udbff][\udc00-\udfff]/g, function (ch) {
                        var code = get_full_char_code(ch, 0).toString(16);
                        return "\\u{" + code + "}";
                    });
                }
                return str.replace(/[\u0000-\u001f\u007f-\uffff]/g, function (ch) {
                    var code = ch.charCodeAt(0).toString(16);
                    if (code.length <= 2 && !identifier) {
                        while (code.length < 2)
                            code = "0" + code;
                        return "\\x" + code;
                    }
                    else {
                        while (code.length < 4)
                            code = "0" + code;
                        return "\\u" + code;
                    }
                });
            } : function (str) {
                return str.replace(/[\ud800-\udbff][\udc00-\udfff]|([\ud800-\udbff]|[\udc00-\udfff])/g, function (match, lone) {
                    if (lone) {
                        return "\\u" + lone.charCodeAt(0).toString(16);
                    }
                    return match;
                });
            };
            function make_string(str, quote) {
                var dq = 0, sq = 0;
                str = str.replace(/[\\\b\f\n\r\v\t\x22\x27\u2028\u2029\0\ufeff]/g, function (s, i) {
                    switch (s) {
                        case '"':
                            ++dq;
                            return '"';
                        case "'":
                            ++sq;
                            return "'";
                        case "\\": return "\\\\";
                        case "\n": return "\\n";
                        case "\r": return "\\r";
                        case "\t": return "\\t";
                        case "\b": return "\\b";
                        case "\f": return "\\f";
                        case "\x0B": return options.ie8 ? "\\x0B" : "\\v";
                        case "\u2028": return "\\u2028";
                        case "\u2029": return "\\u2029";
                        case "\ufeff": return "\\ufeff";
                        case "\0":
                            return /[0-9]/.test(get_full_char(str, i + 1)) ? "\\x00" : "\\0";
                    }
                    return s;
                });
                function quote_single() {
                    return "'" + str.replace(/\x27/g, "\\'") + "'";
                }
                function quote_double() {
                    return '"' + str.replace(/\x22/g, '\\"') + '"';
                }
                function quote_template() {
                    return "`" + str.replace(/`/g, "\\`") + "`";
                }
                str = to_utf8(str);
                if (quote === "`")
                    return quote_template();
                switch (options.quote_style) {
                    case 1:
                        return quote_single();
                    case 2:
                        return quote_double();
                    case 3:
                        return quote == "'" ? quote_single() : quote_double();
                    default:
                        return dq > sq ? quote_single() : quote_double();
                }
            }
            function encode_string(str, quote) {
                var ret = make_string(str, quote);
                if (options.inline_script) {
                    ret = ret.replace(/<\x2f(script)([>\/\t\n\f\r ])/gi, "<\\/$1$2");
                    ret = ret.replace(/\x3c!--/g, "\\x3c!--");
                    ret = ret.replace(/--\x3e/g, "--\\x3e");
                }
                return ret;
            }
            function make_name(name) {
                name = name.toString();
                name = to_utf8(name, true);
                return name;
            }
            function make_indent(back) {
                return " ".repeat(options.indent_start + indentation - back * options.indent_level);
            }
            /* -----[ beautification/minification ]----- */
            var has_parens = false;
            var might_need_space = false;
            var might_need_semicolon = false;
            var might_add_newline = 0;
            var need_newline_indented = false;
            var need_space = false;
            var newline_insert = -1;
            var last = "";
            var mapping_token, mapping_name, mappings = options.source_map && [];
            var do_add_mapping = mappings ? function () {
                mappings.forEach(function (mapping) {
                    try {
                        let { name, token } = mapping;
                        if (token.type == "name" || token.type === "privatename") {
                            name = token.value;
                        }
                        else if (name instanceof AST_Symbol) {
                            name = token.type === "string" ? token.value : name.name;
                        }
                        options.source_map.add(mapping.token.file, mapping.line, mapping.col, mapping.token.line, mapping.token.col, is_basic_identifier_string(name) ? name : undefined);
                    }
                    catch (ex) {
                        // Ignore bad mapping
                    }
                });
                mappings = [];
            } : noop;
            var ensure_line_len = options.max_line_len ? function () {
                if (current_col > options.max_line_len) {
                    if (might_add_newline) {
                        OUTPUT.insertAt("\n", might_add_newline);
                        const curLength = OUTPUT.curLength();
                        if (mappings) {
                            var delta = curLength - current_col;
                            mappings.forEach(function (mapping) {
                                mapping.line++;
                                mapping.col += delta;
                            });
                        }
                        current_line++;
                        current_pos++;
                        current_col = curLength;
                    }
                }
                if (might_add_newline) {
                    might_add_newline = 0;
                    do_add_mapping();
                }
            } : noop;
            var requireSemicolonChars = makePredicate("( [ + * / - , . `");
            function print(str) {
                str = String(str);
                var ch = get_full_char(str, 0);
                if (need_newline_indented && ch) {
                    need_newline_indented = false;
                    if (ch !== "\n") {
                        print("\n");
                        indent();
                    }
                }
                if (need_space && ch) {
                    need_space = false;
                    if (!/[\s;})]/.test(ch)) {
                        space();
                    }
                }
                newline_insert = -1;
                var prev = last.charAt(last.length - 1);
                if (might_need_semicolon) {
                    might_need_semicolon = false;
                    if (prev === ":" && ch === "}" || (!ch || !";}".includes(ch)) && prev !== ";") {
                        if (options.semicolons || requireSemicolonChars.has(ch)) {
                            OUTPUT.append(";");
                            current_col++;
                            current_pos++;
                        }
                        else {
                            ensure_line_len();
                            if (current_col > 0) {
                                OUTPUT.append("\n");
                                current_pos++;
                                current_line++;
                                current_col = 0;
                            }
                            if (/^\s+$/.test(str)) {
                                // reset the semicolon flag, since we didn't print one
                                // now and might still have to later
                                might_need_semicolon = true;
                            }
                        }
                        if (!options.beautify)
                            might_need_space = false;
                    }
                }
                if (might_need_space) {
                    if ((is_identifier_char(prev)
                        && (is_identifier_char(ch) || ch == "\\"))
                        || (ch == "/" && ch == prev)
                        || ((ch == "+" || ch == "-") && ch == last)) {
                        OUTPUT.append(" ");
                        current_col++;
                        current_pos++;
                    }
                    might_need_space = false;
                }
                if (mapping_token) {
                    mappings.push({
                        token: mapping_token,
                        name: mapping_name,
                        line: current_line,
                        col: current_col
                    });
                    mapping_token = false;
                    if (!might_add_newline)
                        do_add_mapping();
                }
                OUTPUT.append(str);
                has_parens = str[str.length - 1] == "(";
                current_pos += str.length;
                var a = str.split(/\r?\n/), n = a.length - 1;
                current_line += n;
                current_col += a[0].length;
                if (n > 0) {
                    ensure_line_len();
                    current_col = a[n].length;
                }
                last = str;
            }
            var star = function () {
                print("*");
            };
            var space = options.beautify ? function () {
                print(" ");
            } : function () {
                might_need_space = true;
            };
            var indent = options.beautify ? function (half) {
                if (options.beautify) {
                    print(make_indent(half ? 0.5 : 0));
                }
            } : noop;
            var with_indent = options.beautify ? function (col, cont) {
                if (col === true)
                    col = next_indent();
                var save_indentation = indentation;
                indentation = col;
                var ret = cont();
                indentation = save_indentation;
                return ret;
            } : function (col, cont) { return cont(); };
            var newline = options.beautify ? function () {
                if (newline_insert < 0)
                    return print("\n");
                if (OUTPUT.charAt(newline_insert) != "\n") {
                    OUTPUT.insertAt("\n", newline_insert);
                    current_pos++;
                    current_line++;
                }
                newline_insert++;
            } : options.max_line_len ? function () {
                ensure_line_len();
                might_add_newline = OUTPUT.length();
            } : noop;
            var semicolon = options.beautify ? function () {
                print(";");
            } : function () {
                might_need_semicolon = true;
            };
            function force_semicolon() {
                might_need_semicolon = false;
                print(";");
            }
            function next_indent() {
                return indentation + options.indent_level;
            }
            function with_block(cont) {
                var ret;
                print("{");
                newline();
                with_indent(next_indent(), function () {
                    ret = cont();
                });
                indent();
                print("}");
                return ret;
            }
            function with_parens(cont) {
                print("(");
                //XXX: still nice to have that for argument lists
                //var ret = with_indent(current_col, cont);
                var ret = cont();
                print(")");
                return ret;
            }
            function with_square(cont) {
                print("[");
                //var ret = with_indent(current_col, cont);
                var ret = cont();
                print("]");
                return ret;
            }
            function comma() {
                print(",");
                space();
            }
            function colon() {
                print(":");
                space();
            }
            var add_mapping = mappings ? function (token, name) {
                mapping_token = token;
                mapping_name = name;
            } : noop;
            function get() {
                if (might_add_newline) {
                    ensure_line_len();
                }
                return OUTPUT.toString();
            }
            function has_nlb() {
                const output = OUTPUT.toString();
                let n = output.length - 1;
                while (n >= 0) {
                    const code = output.charCodeAt(n);
                    if (code === CODE_LINE_BREAK) {
                        return true;
                    }
                    if (code !== CODE_SPACE) {
                        return false;
                    }
                    n--;
                }
                return true;
            }
            function filter_comment(comment) {
                if (!options.preserve_annotations) {
                    comment = comment.replace(r_annotation, " ");
                }
                if (/^\s*$/.test(comment)) {
                    return "";
                }
                return comment.replace(/(<\s*\/\s*)(script)/i, "<\\/$2");
            }
            function prepend_comments(node) {
                var self = this;
                var start = node.start;
                if (!start)
                    return;
                var printed_comments = self.printed_comments;
                // There cannot be a newline between return and its value.
                const return_with_value = node instanceof AST_Exit && node.value;
                if (start.comments_before
                    && printed_comments.has(start.comments_before)) {
                    if (return_with_value) {
                        start.comments_before = [];
                    }
                    else {
                        return;
                    }
                }
                var comments = start.comments_before;
                if (!comments) {
                    comments = start.comments_before = [];
                }
                printed_comments.add(comments);
                if (return_with_value) {
                    var tw = new TreeWalker(function (node) {
                        var parent = tw.parent();
                        if (parent instanceof AST_Exit
                            || parent instanceof AST_Binary && parent.left === node
                            || parent.TYPE == "Call" && parent.expression === node
                            || parent instanceof AST_Conditional && parent.condition === node
                            || parent instanceof AST_Dot && parent.expression === node
                            || parent instanceof AST_Sequence && parent.expressions[0] === node
                            || parent instanceof AST_Sub && parent.expression === node
                            || parent instanceof AST_UnaryPostfix) {
                            if (!node.start)
                                return;
                            var text = node.start.comments_before;
                            if (text && !printed_comments.has(text)) {
                                printed_comments.add(text);
                                comments = comments.concat(text);
                            }
                        }
                        else {
                            return true;
                        }
                    });
                    tw.push(node);
                    node.value.walk(tw);
                }
                if (current_pos == 0) {
                    if (comments.length > 0 && options.shebang && comments[0].type === "comment5"
                        && !printed_comments.has(comments[0])) {
                        print("#!" + comments.shift().value + "\n");
                        indent();
                    }
                    var preamble = options.preamble;
                    if (preamble) {
                        print(preamble.replace(/\r\n?|[\n\u2028\u2029]|\s*$/g, "\n"));
                    }
                }
                comments = comments.filter(comment_filter, node).filter(c => !printed_comments.has(c));
                if (comments.length == 0)
                    return;
                var last_nlb = has_nlb();
                comments.forEach(function (c, i) {
                    printed_comments.add(c);
                    if (!last_nlb) {
                        if (c.nlb) {
                            print("\n");
                            indent();
                            last_nlb = true;
                        }
                        else if (i > 0) {
                            space();
                        }
                    }
                    if (/comment[134]/.test(c.type)) {
                        var value = filter_comment(c.value);
                        if (value) {
                            print("//" + value + "\n");
                            indent();
                        }
                        last_nlb = true;
                    }
                    else if (c.type == "comment2") {
                        var value = filter_comment(c.value);
                        if (value) {
                            print("/*" + value + "*/");
                        }
                        last_nlb = false;
                    }
                });
                if (!last_nlb) {
                    if (start.nlb) {
                        print("\n");
                        indent();
                    }
                    else {
                        space();
                    }
                }
            }
            function append_comments(node, tail) {
                var self = this;
                var token = node.end;
                if (!token)
                    return;
                var printed_comments = self.printed_comments;
                var comments = token[tail ? "comments_before" : "comments_after"];
                if (!comments || printed_comments.has(comments))
                    return;
                if (!(node instanceof AST_Statement || comments.every((c) => !/comment[134]/.test(c.type))))
                    return;
                printed_comments.add(comments);
                var insert = OUTPUT.length();
                comments.filter(comment_filter, node).forEach(function (c, i) {
                    if (printed_comments.has(c))
                        return;
                    printed_comments.add(c);
                    need_space = false;
                    if (need_newline_indented) {
                        print("\n");
                        indent();
                        need_newline_indented = false;
                    }
                    else if (c.nlb && (i > 0 || !has_nlb())) {
                        print("\n");
                        indent();
                    }
                    else if (i > 0 || !tail) {
                        space();
                    }
                    if (/comment[134]/.test(c.type)) {
                        const value = filter_comment(c.value);
                        if (value) {
                            print("//" + value);
                        }
                        need_newline_indented = true;
                    }
                    else if (c.type == "comment2") {
                        const value = filter_comment(c.value);
                        if (value) {
                            print("/*" + value + "*/");
                        }
                        need_space = true;
                    }
                });
                if (OUTPUT.length() > insert)
                    newline_insert = insert;
            }
            /**
             * When output.option("_destroy_ast") is enabled, destroy the function.
             * Call this after printing it.
             */
            const gc_scope = options["_destroy_ast"]
                ? function gc_scope(scope) {
                    scope.body.length = 0;
                    scope.argnames.length = 0;
                }
                : noop;
            var stack = [];
            return {
                get: get,
                toString: get,
                indent: indent,
                in_directive: false,
                use_asm: null,
                active_scope: null,
                indentation: function () { return indentation; },
                current_width: function () { return current_col - indentation; },
                should_break: function () { return options.width && this.current_width() >= options.width; },
                has_parens: function () { return has_parens; },
                newline: newline,
                print: print,
                star: star,
                space: space,
                comma: comma,
                colon: colon,
                last: function () { return last; },
                semicolon: semicolon,
                force_semicolon: force_semicolon,
                to_utf8: to_utf8,
                print_name: function (name) { print(make_name(name)); },
                print_string: function (str, quote, escape_directive) {
                    var encoded = encode_string(str, quote);
                    if (escape_directive === true && !encoded.includes("\\")) {
                        // Insert semicolons to break directive prologue
                        if (!EXPECT_DIRECTIVE.test(OUTPUT.toString())) {
                            force_semicolon();
                        }
                        force_semicolon();
                    }
                    print(encoded);
                },
                print_template_string_chars: function (str) {
                    var encoded = encode_string(str, "`").replace(/\${/g, "\\${");
                    return print(encoded.substr(1, encoded.length - 2));
                },
                encode_string: encode_string,
                next_indent: next_indent,
                with_indent: with_indent,
                with_block: with_block,
                with_parens: with_parens,
                with_square: with_square,
                add_mapping: add_mapping,
                option: function (opt) { return options[opt]; },
                gc_scope,
                printed_comments: printed_comments,
                prepend_comments: readonly ? noop : prepend_comments,
                append_comments: readonly || comment_filter === return_false ? noop : append_comments,
                line: function () { return current_line; },
                col: function () { return current_col; },
                pos: function () { return current_pos; },
                push_node: function (node) { stack.push(node); },
                pop_node: function () { return stack.pop(); },
                parent: function (n) {
                    return stack[stack.length - 2 - (n || 0)];
                }
            };
        }