function base64decode(host, input) {
            if (host && host.base64decode) {
                return host.base64decode(input);
            }
            const length2 = input.length;
            const expandedCharCodes = [];
            let i = 0;
            while (i < length2) {
                if (input.charCodeAt(i) === base64Digits.charCodeAt(64)) {
                    break;
                }
                const ch1 = base64Digits.indexOf(input[i]);
                const ch2 = base64Digits.indexOf(input[i + 1]);
                const ch3 = base64Digits.indexOf(input[i + 2]);
                const ch4 = base64Digits.indexOf(input[i + 3]);
                const code1 = (ch1 & 63) << 2 | ch2 >> 4 & 3;
                const code2 = (ch2 & 15) << 4 | ch3 >> 2 & 15;
                const code3 = (ch3 & 3) << 6 | ch4 & 63;
                if (code2 === 0 && ch3 !== 0) {
                    expandedCharCodes.push(code1);
                }
                else if (code3 === 0 && ch4 !== 0) {
                    expandedCharCodes.push(code1, code2);
                }
                else {
                    expandedCharCodes.push(code1, code2, code3);
                }
                i += 4;
            }
            return getStringFromExpandedCharCodes(expandedCharCodes);
        }