function escapeJsxAttributeString(s, quoteChar) {
            const escapedCharsRegExp = quoteChar === 39 /* singleQuote */ ? jsxSingleQuoteEscapedCharsRegExp : jsxDoubleQuoteEscapedCharsRegExp;
            return s.replace(escapedCharsRegExp, getJsxAttributeStringReplacement);
        }