function decodeUnreserved(str) {
            var decStr = pctDecChars(str);
            return !decStr.match(UNRESERVED) ? str : decStr;
        }