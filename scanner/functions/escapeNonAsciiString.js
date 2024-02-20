function escapeNonAsciiString(s, quoteChar) {
            s = escapeString(s, quoteChar);
            return nonAsciiCharacters.test(s) ? s.replace(nonAsciiCharacters, (c) => encodeUtf16EscapeSequence(c.charCodeAt(0))) : s;
        }