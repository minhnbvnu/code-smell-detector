function fixupWhitespaceAndDecodeEntities(text) {
                let acc;
                let firstNonWhitespace = 0;
                let lastNonWhitespace = -1;
                for (let i = 0; i < text.length; i++) {
                    const c = text.charCodeAt(i);
                    if (isLineBreak(c)) {
                        if (firstNonWhitespace !== -1 && lastNonWhitespace !== -1) {
                            acc = addLineOfJsxText(acc, text.substr(firstNonWhitespace, lastNonWhitespace - firstNonWhitespace + 1));
                        }
                        firstNonWhitespace = -1;
                    }
                    else if (!isWhiteSpaceSingleLine(c)) {
                        lastNonWhitespace = i;
                        if (firstNonWhitespace === -1) {
                            firstNonWhitespace = i;
                        }
                    }
                }
                return firstNonWhitespace !== -1 ? addLineOfJsxText(acc, text.substr(firstNonWhitespace)) : acc;
            }