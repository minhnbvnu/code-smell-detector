function sprintf_format(parse_tree, argv) {
            var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length, is_positive, sign;
            for (i = 0; i < tree_length; i++) {
                if (typeof parse_tree[i] === 'string') {
                    output += parse_tree[i];
                }
                else if (typeof parse_tree[i] === 'object') {
                    ph = parse_tree[i]; // convenience purposes only
                    if (ph.keys) { // keyword argument
                        arg = argv[cursor];
                        for (k = 0; k < ph.keys.length; k++) {
                            if (arg == undefined) {
                                throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k - 1]));
                            }
                            arg = arg[ph.keys[k]];
                        }
                    }
                    else if (ph.param_no) { // positional argument (explicit)
                        arg = argv[ph.param_no];
                    }
                    else { // positional argument (implicit)
                        arg = argv[cursor++];
                    }
                    if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
                        arg = arg();
                    }
                    if (re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
                        throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg));
                    }
                    if (re.number.test(ph.type)) {
                        is_positive = arg >= 0;
                    }
                    switch (ph.type) {
                        case 'b':
                            arg = parseInt(arg, 10).toString(2);
                            break;
                        case 'c':
                            arg = String.fromCharCode(parseInt(arg, 10));
                            break;
                        case 'd':
                        case 'i':
                            arg = parseInt(arg, 10);
                            break;
                        case 'j':
                            arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
                            break;
                        case 'e':
                            arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
                            break;
                        case 'f':
                            arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
                            break;
                        case 'g':
                            arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
                            break;
                        case 'o':
                            arg = (parseInt(arg, 10) >>> 0).toString(8);
                            break;
                        case 's':
                            arg = String(arg);
                            arg = (ph.precision ? arg.substring(0, ph.precision) : arg);
                            break;
                        case 't':
                            arg = String(!!arg);
                            arg = (ph.precision ? arg.substring(0, ph.precision) : arg);
                            break;
                        case 'T':
                            arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
                            arg = (ph.precision ? arg.substring(0, ph.precision) : arg);
                            break;
                        case 'u':
                            arg = parseInt(arg, 10) >>> 0;
                            break;
                        case 'v':
                            arg = arg.valueOf();
                            arg = (ph.precision ? arg.substring(0, ph.precision) : arg);
                            break;
                        case 'x':
                            arg = (parseInt(arg, 10) >>> 0).toString(16);
                            break;
                        case 'X':
                            arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
                            break;
                    }
                    if (re.json.test(ph.type)) {
                        output += arg;
                    }
                    else {
                        if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                            sign = is_positive ? '+' : '-';
                            arg = arg.toString().replace(re.sign, '');
                        }
                        else {
                            sign = '';
                        }
                        pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' ';
                        pad_length = ph.width - (sign + arg).length;
                        pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : '';
                        output += ph.align ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg);
                    }
                }
            }
            return output;
        }