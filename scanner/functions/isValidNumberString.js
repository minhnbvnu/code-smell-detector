function isValidNumberString(s, roundTripOnly) {
                if (s === "")
                    return false;
                const n = +s;
                return isFinite(n) && (!roundTripOnly || "" + n === s);
            }