function createMethodImplementingSignatures(checker, context, enclosingDeclaration, signatures, name, optional, modifiers, quotePreference, body) {
            let maxArgsSignature = signatures[0];
            let minArgumentCount = signatures[0].minArgumentCount;
            let someSigHasRestParameter = false;
            for (const sig of signatures) {
                minArgumentCount = Math.min(sig.minArgumentCount, minArgumentCount);
                if (signatureHasRestParameter(sig)) {
                    someSigHasRestParameter = true;
                }
                if (sig.parameters.length >= maxArgsSignature.parameters.length && (!signatureHasRestParameter(sig) || signatureHasRestParameter(maxArgsSignature))) {
                    maxArgsSignature = sig;
                }
            }
            const maxNonRestArgs = maxArgsSignature.parameters.length - (signatureHasRestParameter(maxArgsSignature) ? 1 : 0);
            const maxArgsParameterSymbolNames = maxArgsSignature.parameters.map((symbol) => symbol.name);
            const parameters = createDummyParameters(maxNonRestArgs, maxArgsParameterSymbolNames, 
            /* types */
            void 0, minArgumentCount, 
            /*inJs*/
            false);
            if (someSigHasRestParameter) {
                const restParameter = factory.createParameterDeclaration(
                /*modifiers*/
                void 0, factory.createToken(25 /* DotDotDotToken */), maxArgsParameterSymbolNames[maxNonRestArgs] || "rest", 
                /*questionToken*/
                maxNonRestArgs >= minArgumentCount ? factory.createToken(57 /* QuestionToken */) : void 0, factory.createArrayTypeNode(factory.createKeywordTypeNode(157 /* UnknownKeyword */)), 
                /*initializer*/
                void 0);
                parameters.push(restParameter);
            }
            return createStubbedMethod(modifiers, name, optional, 
            /*typeParameters*/
            void 0, parameters, getReturnTypeFromSignatures(signatures, checker, context, enclosingDeclaration), quotePreference, body);
        }