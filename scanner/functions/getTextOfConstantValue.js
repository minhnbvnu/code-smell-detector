function getTextOfConstantValue(value) {
            return isString(value) ? '"' + escapeNonAsciiString(value) + '"' : "" + value;
        }