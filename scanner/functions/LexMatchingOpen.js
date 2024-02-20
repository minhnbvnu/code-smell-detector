function LexMatchingOpen(code) {
        if(code == TypeScript.LexCodeRBR) {
            return TypeScript.LexCodeLBR;
        } else {
            if(code == TypeScript.LexCodeRC) {
                return TypeScript.LexCodeLC;
            } else {
                if(code == TypeScript.LexCodeRPR) {
                    return TypeScript.LexCodeLPR;
                } else {
                    return 0;
                }
            }
        }
    }