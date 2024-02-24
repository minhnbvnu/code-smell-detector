function parsePseudoBigInt(stringValue) {
            let log2Base;
            switch (stringValue.charCodeAt(1)) {
                case 98 /* b */:
                case 66 /* B */:
                    log2Base = 1;
                    break;
                case 111 /* o */:
                case 79 /* O */:
                    log2Base = 3;
                    break;
                case 120 /* x */:
                case 88 /* X */:
                    log2Base = 4;
                    break;
                default:
                    const nIndex = stringValue.length - 1;
                    let nonZeroStart = 0;
                    while (stringValue.charCodeAt(nonZeroStart) === 48 /* _0 */) {
                        nonZeroStart++;
                    }
                    return stringValue.slice(nonZeroStart, nIndex) || "0";
            }
            const startIndex = 2, endIndex = stringValue.length - 1;
            const bitsNeeded = (endIndex - startIndex) * log2Base;
            const segments = new Uint16Array((bitsNeeded >>> 4) + (bitsNeeded & 15 ? 1 : 0));
            for (let i = endIndex - 1, bitOffset = 0; i >= startIndex; i--, bitOffset += log2Base) {
                const segment = bitOffset >>> 4;
                const digitChar = stringValue.charCodeAt(i);
                const digit = digitChar <= 57 /* _9 */ ? digitChar - 48 /* _0 */ : 10 + digitChar - (digitChar <= 70 /* F */ ? 65 /* A */ : 97 /* a */);
                const shiftedDigit = digit << (bitOffset & 15);
                segments[segment] |= shiftedDigit;
                const residual = shiftedDigit >>> 16;
                if (residual)
                    segments[segment + 1] |= residual;
            }
            let base10Value = "";
            let firstNonzeroSegment = segments.length - 1;
            let segmentsRemaining = true;
            while (segmentsRemaining) {
                let mod10 = 0;
                segmentsRemaining = false;
                for (let segment = firstNonzeroSegment; segment >= 0; segment--) {
                    const newSegment = mod10 << 16 | segments[segment];
                    const segmentValue = newSegment / 10 | 0;
                    segments[segment] = segmentValue;
                    mod10 = newSegment - segmentValue * 10;
                    if (segmentValue && !segmentsRemaining) {
                        firstNonzeroSegment = segment;
                        segmentsRemaining = true;
                    }
                }
                base10Value = mod10 + base10Value;
            }
            return base10Value;
        }