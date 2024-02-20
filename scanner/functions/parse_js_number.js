function parse_js_number(num, allow_e = true) {
            if (!allow_e && num.includes("e")) {
                return NaN;
            }
            if (RE_HEX_NUMBER.test(num)) {
                return parseInt(num.substr(2), 16);
            }
            else if (RE_OCT_NUMBER.test(num)) {
                return parseInt(num.substr(1), 8);
            }
            else if (RE_ES6_OCT_NUMBER.test(num)) {
                return parseInt(num.substr(2), 8);
            }
            else if (RE_BIN_NUMBER.test(num)) {
                return parseInt(num.substr(2), 2);
            }
            else if (RE_DEC_NUMBER.test(num)) {
                return parseFloat(num);
            }
            else {
                var val = parseFloat(num);
                if (val == num)
                    return val;
            }
        }