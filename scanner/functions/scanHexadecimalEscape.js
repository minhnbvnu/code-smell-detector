function scanHexadecimalEscape(numDigits) {
                const escapedValue = scanExactNumberOfHexDigits(numDigits, 
                /*canHaveSeparators*/
                false);
                if (escapedValue >= 0) {
                    return String.fromCharCode(escapedValue);
                }
                else {
                    error(Diagnostics.Hexadecimal_digit_expected);
                    return "";
                }
            }