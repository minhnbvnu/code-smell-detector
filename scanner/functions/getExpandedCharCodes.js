function getExpandedCharCodes(input) {
            const output = [];
            const length2 = input.length;
            for (let i = 0; i < length2; i++) {
                const charCode = input.charCodeAt(i);
                if (charCode < 128) {
                    output.push(charCode);
                }
                else if (charCode < 2048) {
                    output.push(charCode >> 6 | 192);
                    output.push(charCode & 63 | 128);
                }
                else if (charCode < 65536) {
                    output.push(charCode >> 12 | 224);
                    output.push(charCode >> 6 & 63 | 128);
                    output.push(charCode & 63 | 128);
                }
                else if (charCode < 131072) {
                    output.push(charCode >> 18 | 240);
                    output.push(charCode >> 12 & 63 | 128);
                    output.push(charCode >> 6 & 63 | 128);
                    output.push(charCode & 63 | 128);
                }
                else {
                    Debug.assert(false, "Unexpected code point");
                }
            }
            return output;
        }