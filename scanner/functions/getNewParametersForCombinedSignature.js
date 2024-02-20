function getNewParametersForCombinedSignature(signatureDeclarations) {
                const lastSig = signatureDeclarations[signatureDeclarations.length - 1];
                if (isFunctionLikeDeclaration(lastSig) && lastSig.body) {
                    signatureDeclarations = signatureDeclarations.slice(0, signatureDeclarations.length - 1);
                }
                return factory.createNodeArray([
                    factory.createParameterDeclaration(
                    /*modifiers*/
                    void 0, factory.createToken(25 /* DotDotDotToken */), "args", 
                    /*questionToken*/
                    void 0, factory.createUnionTypeNode(map(signatureDeclarations, convertSignatureParametersToTuple)))
                ]);
            }