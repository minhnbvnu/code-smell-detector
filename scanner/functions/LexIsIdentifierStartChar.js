function LexIsIdentifierStartChar(code) {
        return (((code >= 97) && (code <= 122)) || ((code >= 65) && (code <= 90)) || (code == TypeScript.LexCodeDollar) || (code == TypeScript.LexCodeUnderscore));
    }