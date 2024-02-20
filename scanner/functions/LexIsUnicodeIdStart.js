function LexIsUnicodeIdStart(code) {
        if(TypeScript.codeGenTarget == TypeScript.CodeGenTarget.ES3) {
            return LexLookUpUnicodeMap(code, unicodeES3IdStart);
        } else {
            return LexLookUpUnicodeMap(code, unicodeES5IdStart);
        }
    }