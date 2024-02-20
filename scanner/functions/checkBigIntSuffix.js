function checkBigIntSuffix() {
                if (text.charCodeAt(pos) === 110 /* n */) {
                    tokenValue += "n";
                    if (tokenFlags & 384 /* BinaryOrOctalSpecifier */) {
                        tokenValue = parsePseudoBigInt(tokenValue) + "n";
                    }
                    pos++;
                    return 9 /* BigIntLiteral */;
                }
                else {
                    const numericValue = tokenFlags & 128 /* BinarySpecifier */ ? parseInt(tokenValue.slice(2), 2) : tokenFlags & 256 /* OctalSpecifier */ ? parseInt(tokenValue.slice(2), 8) : +tokenValue;
                    tokenValue = "" + numericValue;
                    return 8 /* NumericLiteral */;
                }
            }