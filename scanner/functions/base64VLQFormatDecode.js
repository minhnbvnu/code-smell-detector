function base64VLQFormatDecode() {
                let moreDigits = true;
                let shiftCount = 0;
                let value = 0;
                for (; moreDigits; pos++) {
                    if (pos >= mappings.length)
                        return setError("Error in decoding base64VLQFormatDecode, past the mapping string"), -1;
                    const currentByte = base64FormatDecode(mappings.charCodeAt(pos));
                    if (currentByte === -1)
                        return setError("Invalid character in VLQ"), -1;
                    moreDigits = (currentByte & 32) !== 0;
                    value = value | (currentByte & 31) << shiftCount;
                    shiftCount += 5;
                }
                if ((value & 1) === 0) {
                    value = value >> 1;
                }
                else {
                    value = value >> 1;
                    value = -value;
                }
                return value;
            }