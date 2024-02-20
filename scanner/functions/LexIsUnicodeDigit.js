function LexIsUnicodeDigit(code) {
        if(TypeScript.codeGenTarget == TypeScript.CodeGenTarget.ES3) {
            return LexLookUpUnicodeMap(code, unicodeES3IdCont);
        } else {
            return LexLookUpUnicodeMap(code, unicodeES5IdCont);
        }
    }