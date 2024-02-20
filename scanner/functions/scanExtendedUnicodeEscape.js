function scanExtendedUnicodeEscape() {
                const escapedValueString = scanMinimumNumberOfHexDigits(1, 
                /*canHaveSeparators*/
                false);
                const escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
                let isInvalidExtendedEscape = false;
                if (escapedValue < 0) {
                    error(Diagnostics.Hexadecimal_digit_expected);
                    isInvalidExtendedEscape = true;
                }
                else if (escapedValue > 1114111) {
                    error(Diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive);
                    isInvalidExtendedEscape = true;
                }
                if (pos >= end) {
                    error(Diagnostics.Unexpected_end_of_text);
                    isInvalidExtendedEscape = true;
                }
                else if (text.charCodeAt(pos) === 125 /* closeBrace */) {
                    pos++;
                }
                else {
                    error(Diagnostics.Unterminated_Unicode_escape_sequence);
                    isInvalidExtendedEscape = true;
                }
                if (isInvalidExtendedEscape) {
                    return "";
                }
                return utf16EncodeAsString(escapedValue);
            }