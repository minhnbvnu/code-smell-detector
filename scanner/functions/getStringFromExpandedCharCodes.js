function getStringFromExpandedCharCodes(codes) {
            let output = "";
            let i = 0;
            const length2 = codes.length;
            while (i < length2) {
                const charCode = codes[i];
                if (charCode < 128) {
                    output += String.fromCharCode(charCode);
                    i++;
                }
                else if ((charCode & 192) === 192) {
                    let value = charCode & 63;
                    i++;
                    let nextCode = codes[i];
                    while ((nextCode & 192) === 128) {
                        value = value << 6 | nextCode & 63;
                        i++;
                        nextCode = codes[i];
                    }
                    output += String.fromCharCode(value);
                }
                else {
                    output += String.fromCharCode(charCode);
                    i++;
                }
            }
            return output;
        }