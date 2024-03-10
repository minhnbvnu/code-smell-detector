function get_next_token() {
            var i, resulting_string;

            n_newlines = 0;

            if (parser_pos >= input_length) {
                return ['', 'TK_EOF'];
            }

            input_wanted_newline = false;
            whitespace_before_token = [];

            var c = input.charAt(parser_pos);
            parser_pos += 1;

            while (in_array(c, whitespace)) {

                if (c === '\n') {
                    n_newlines += 1;
                    whitespace_before_token = [];
                } else if (n_newlines) {
                    if (c === indent_string) {
                        whitespace_before_token.push(indent_string);
                    } else if (c !== '\r') {
                        whitespace_before_token.push(' ');
                    }
                }

                if (parser_pos >= input_length) {
                    return ['', 'TK_EOF'];
                }

                c = input.charAt(parser_pos);
                parser_pos += 1;
            }

            if (in_array(c, wordchar)) {
                if (parser_pos < input_length) {
                    while (in_array(input.charAt(parser_pos), wordchar)) {
                        c += input.charAt(parser_pos);
                        parser_pos += 1;
                        if (parser_pos === input_length) {
                            break;
                        }
                    }
                }

                // small and surprisingly unugly hack for 1E-10 representation
                if (parser_pos !== input_length && c.match(/^[0-9]+[Ee]$/) && (input.charAt(parser_pos) === '-' || input.charAt(parser_pos) === '+')) {

                    var sign = input.charAt(parser_pos);
                    parser_pos += 1;

                    var t = get_next_token();
                    c += sign + t[0];
                    return [c, 'TK_WORD'];
                }

                if (c === 'in') { // hack for 'in' operator
                    return [c, 'TK_OPERATOR'];
                }
                return [c, 'TK_WORD'];
            }

            if (c === '(' || c === '[') {
                return [c, 'TK_START_EXPR'];
            }

            if (c === ')' || c === ']') {
                return [c, 'TK_END_EXPR'];
            }

            if (c === '{') {
                return [c, 'TK_START_BLOCK'];
            }

            if (c === '}') {
                return [c, 'TK_END_BLOCK'];
            }

            if (c === ';') {
                return [c, 'TK_SEMICOLON'];
            }

            if (c === '/') {
                var comment = '';
                // peek for comment /* ... */
                var inline_comment = true;
                if (input.charAt(parser_pos) === '*') {
                    parser_pos += 1;
                    if (parser_pos < input_length) {
                        while (parser_pos < input_length && !(input.charAt(parser_pos) === '*' && input.charAt(parser_pos + 1) && input.charAt(parser_pos + 1) === '/')) {
                            c = input.charAt(parser_pos);
                            comment += c;
                            if (c === "\n" || c === "\r") {
                                inline_comment = false;
                            }
                            parser_pos += 1;
                            if (parser_pos >= input_length) {
                                break;
                            }
                        }
                    }
                    parser_pos += 2;
                    if (inline_comment && n_newlines === 0) {
                        return ['/*' + comment + '*/', 'TK_INLINE_COMMENT'];
                    } else {
                        return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
                    }
                }
                // peek for comment // ...
                if (input.charAt(parser_pos) === '/') {
                    comment = c;
                    while (input.charAt(parser_pos) !== '\r' && input.charAt(parser_pos) !== '\n') {
                        comment += input.charAt(parser_pos);
                        parser_pos += 1;
                        if (parser_pos >= input_length) {
                            break;
                        }
                    }
                    return [comment, 'TK_COMMENT'];
                }

            }


            if (c === "'" || c === '"' || // string
                (
                    (c === '/') || // regexp
                    (opt.e4x && c === "<" && input.slice(parser_pos - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*\/?\s*>/)) // xml
                ) && ( // regex and xml can only appear in specific locations during parsing
                    (last_type === 'TK_WORD' && is_special_word(flags.last_text)) ||
                    (last_type === 'TK_END_EXPR' && in_array(previous_flags.mode, [MODE.Conditional, MODE.ForInitializer])) ||
                    (in_array(last_type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK',
                        'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'
                    ]))
                )) {

                var sep = c,
                    esc = false,
                    has_char_escapes = false;

                resulting_string = c;

                if (parser_pos < input_length) {
                    if (sep === '/') {
                        //
                        // handle regexp
                        //
                        var in_char_class = false;
                        while (esc || in_char_class || input.charAt(parser_pos) !== sep) {
                            resulting_string += input.charAt(parser_pos);
                            if (!esc) {
                                esc = input.charAt(parser_pos) === '\\';
                                if (input.charAt(parser_pos) === '[') {
                                    in_char_class = true;
                                } else if (input.charAt(parser_pos) === ']') {
                                    in_char_class = false;
                                }
                            } else {
                                esc = false;
                            }
                            parser_pos += 1;
                            if (parser_pos >= input_length) {
                                // incomplete string/rexp when end-of-file reached.
                                // bail out with what had been received so far.
                                return [resulting_string, 'TK_STRING'];
                            }
                        }
                    } else if (opt.e4x && sep === '<') {
                        //
                        // handle e4x xml literals
                        //
                        var xmlRegExp = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])\s*([-a-zA-Z:0-9_.]+=('[^']*'|"[^"]*"|{[^{}]*})\s*)*(\/?)\s*>/g;
                        var xmlStr = input.slice(parser_pos - 1);
                        var match = xmlRegExp.exec(xmlStr);
                        if (match && match.index === 0) {
                            var rootTag = match[2];
                            var depth = 0;
                            while (match) {
                                var isEndTag = !! match[1];
                                var tagName = match[2];
                                var isSingletonTag = ( !! match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
                                if (tagName === rootTag && !isSingletonTag) {
                                    if (isEndTag) {
                                        --depth;
                                    } else {
                                        ++depth;
                                    }
                                }
                                if (depth <= 0) {
                                    break;
                                }
                                match = xmlRegExp.exec(xmlStr);
                            }
                            var xmlLength = match ? match.index + match[0].length : xmlStr.length;
                            parser_pos += xmlLength - 1;
                            return [xmlStr.slice(0, xmlLength), "TK_STRING"];
                        }
                    } else {
                        //
                        // handle string
                        //
                        while (esc || input.charAt(parser_pos) !== sep) {
                            resulting_string += input.charAt(parser_pos);
                            if (esc) {
                                if (input.charAt(parser_pos) === 'x' || input.charAt(parser_pos) === 'u') {
                                    has_char_escapes = true;
                                }
                                esc = false;
                            } else {
                                esc = input.charAt(parser_pos) === '\\';
                            }
                            parser_pos += 1;
                            if (parser_pos >= input_length) {
                                // incomplete string/rexp when end-of-file reached.
                                // bail out with what had been received so far.
                                return [resulting_string, 'TK_STRING'];
                            }
                        }

                    }
                }

                parser_pos += 1;
                resulting_string += sep;

                if (has_char_escapes && opt.unescape_strings) {
                    resulting_string = unescape_string(resulting_string);
                }

                if (sep === '/') {
                    // regexps may have modifiers /regexp/MOD , so fetch those, too
                    while (parser_pos < input_length && in_array(input.charAt(parser_pos), wordchar)) {
                        resulting_string += input.charAt(parser_pos);
                        parser_pos += 1;
                    }
                }
                return [resulting_string, 'TK_STRING'];
            }

            if (c === '#') {


                if (output_lines.length === 1 && output_lines[0].text.length === 0 &&
                    input.charAt(parser_pos) === '!') {
                    // shebang
                    resulting_string = c;
                    while (parser_pos < input_length && c !== '\n') {
                        c = input.charAt(parser_pos);
                        resulting_string += c;
                        parser_pos += 1;
                    }
                    return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
                }



                // Spidermonkey-specific sharp variables for circular references
                // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
                // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
                var sharp = '#';
                if (parser_pos < input_length && in_array(input.charAt(parser_pos), digits)) {
                    do {
                        c = input.charAt(parser_pos);
                        sharp += c;
                        parser_pos += 1;
                    } while (parser_pos < input_length && c !== '#' && c !== '=');
                    if (c === '#') {
                        //
                    } else if (input.charAt(parser_pos) === '[' && input.charAt(parser_pos + 1) === ']') {
                        sharp += '[]';
                        parser_pos += 2;
                    } else if (input.charAt(parser_pos) === '{' && input.charAt(parser_pos + 1) === '}') {
                        sharp += '{}';
                        parser_pos += 2;
                    }
                    return [sharp, 'TK_WORD'];
                }
            }

            if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
                parser_pos += 3;
                c = '<!--';
                while (input.charAt(parser_pos) !== '\n' && parser_pos < input_length) {
                    c += input.charAt(parser_pos);
                    parser_pos++;
                }
                flags.in_html_comment = true;
                return [c, 'TK_COMMENT'];
            }

            if (c === '-' && flags.in_html_comment && input.substring(parser_pos - 1, parser_pos + 2) === '-->') {
                flags.in_html_comment = false;
                parser_pos += 2;
                return ['-->', 'TK_COMMENT'];
            }

            if (c === '.') {
                return [c, 'TK_DOT'];
            }

            if (in_array(c, punct)) {
                while (parser_pos < input_length && in_array(c + input.charAt(parser_pos), punct)) {
                    c += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos >= input_length) {
                        break;
                    }
                }

                if (c === ',') {
                    return [c, 'TK_COMMA'];
                } else if (c === '=') {
                    return [c, 'TK_EQUALS'];
                } else {
                    return [c, 'TK_OPERATOR'];
                }
            }

            return [c, 'TK_UNKNOWN'];
        }