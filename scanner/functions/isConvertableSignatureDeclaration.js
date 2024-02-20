function isConvertableSignatureDeclaration(d) {
            switch (d.kind) {
                case 170 /* MethodSignature */:
                case 171 /* MethodDeclaration */:
                case 176 /* CallSignature */:
                case 173 /* Constructor */:
                case 177 /* ConstructSignature */:
                case 259 /* FunctionDeclaration */:
                    return true;
            }
            return false;
        }