function isQuoteOrBacktick(charCode) {
            return charCode === 39 /* singleQuote */ || charCode === 34 /* doubleQuote */ || charCode === 96 /* backtick */;
        }