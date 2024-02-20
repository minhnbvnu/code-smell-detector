function appendBase64VLQ(inValue) {
                if (inValue < 0) {
                    inValue = (-inValue << 1) + 1;
                }
                else {
                    inValue = inValue << 1;
                }
                do {
                    let currentDigit = inValue & 31;
                    inValue = inValue >> 5;
                    if (inValue > 0) {
                        currentDigit = currentDigit | 32;
                    }
                    appendMappingCharCode(base64FormatEncode(currentDigit));
                } while (inValue > 0);
            }