function LexAdjustIndent(code, indentAmt) {
        if((code == TypeScript.LexCodeLBR) || (code == TypeScript.LexCodeLC) || (code == TypeScript.LexCodeLPR)) {
            return indentAmt + 1;
        } else {
            if((code == TypeScript.LexCodeRBR) || (code == TypeScript.LexCodeRC) || (code == TypeScript.LexCodeRPR)) {
                return indentAmt - 1;
            } else {
                return indentAmt;
            }
        }
    }