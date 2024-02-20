function sprintf_parse(fmt) {
            if (sprintf_cache[fmt]) {
                return sprintf_cache[fmt];
            }
            var _fmt = fmt, match, parse_tree = [], arg_names = 0;
            while (_fmt) {
                if ((match = re.text.exec(_fmt)) !== null) {
                    parse_tree.push(match[0]);
                }
                else if ((match = re.modulo.exec(_fmt)) !== null) {
                    parse_tree.push('%');
                }
                else if ((match = re.placeholder.exec(_fmt)) !== null) {
                    if (match[2]) {
                        arg_names |= 1;
                        var field_list = [], replacement_field = match[2], field_match = [];
                        if ((field_match = re.key.exec(replacement_field)) !== null) {
                            field_list.push(field_match[1]);
                            while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                                if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                    field_list.push(field_match[1]);
                                }
                                else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                    field_list.push(field_match[1]);
                                }
                                else {
                                    throw new SyntaxError('[sprintf] failed to parse named argument key');
                                }
                            }
                        }
                        else {
                            throw new SyntaxError('[sprintf] failed to parse named argument key');
                        }
                        match[2] = field_list;
                    }
                    else {
                        arg_names |= 2;
                    }
                    if (arg_names === 3) {
                        throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported');
                    }
                    parse_tree.push({
                        placeholder: match[0],
                        param_no: match[1],
                        keys: match[2],
                        sign: match[3],
                        pad_char: match[4],
                        align: match[5],
                        width: match[6],
                        precision: match[7],
                        type: match[8]
                    });
                }
                else {
                    throw new SyntaxError('[sprintf] unexpected placeholder');
                }
                _fmt = _fmt.substring(match[0].length);
            }
            return sprintf_cache[fmt] = parse_tree;
        }