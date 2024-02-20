function isValidBigIntString(s, roundTripOnly) {
            if (s === "")
                return false;
            const scanner2 = createScanner(99 /* ESNext */, 
            /*skipTrivia*/
            false);
            let success = true;
            scanner2.setOnError(() => success = false);
            scanner2.setText(s + "n");
            let result = scanner2.scan();
            const negative = result === 40 /* MinusToken */;
            if (negative) {
                result = scanner2.scan();
            }
            const flags = scanner2.getTokenFlags();
            return success && result === 9 /* BigIntLiteral */ && scanner2.getTextPos() === s.length + 1 && !(flags & 512 /* ContainsSeparator */) && (!roundTripOnly || s === pseudoBigIntToString({ negative, base10Value: parsePseudoBigInt(scanner2.getTokenValue()) }));
        }