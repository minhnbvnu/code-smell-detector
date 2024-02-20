function itemInfoForParameters(candidateSignature, checker, enclosingDeclaration, sourceFile) {
            const printer = createPrinterWithRemoveComments();
            const typeParameterParts = mapToDisplayParts((writer) => {
                if (candidateSignature.typeParameters && candidateSignature.typeParameters.length) {
                    const args = factory.createNodeArray(candidateSignature.typeParameters.map((p) => checker.typeParameterToDeclaration(p, enclosingDeclaration, signatureHelpNodeBuilderFlags)));
                    printer.writeList(53776 /* TypeParameters */, args, sourceFile, writer);
                }
            });
            const lists = checker.getExpandedParameters(candidateSignature);
            const isVariadic = !checker.hasEffectiveRestParameter(candidateSignature) ? (_) => false : lists.length === 1 ? (_) => true : (pList) => {
                var _a2;
                return !!(pList.length && ((_a2 = tryCast(pList[pList.length - 1], isTransientSymbol)) == null ? void 0 : _a2.links.checkFlags) & 32768 /* RestParameter */);
            };
            return lists.map((parameterList) => ({
                isVariadic: isVariadic(parameterList),
                parameters: parameterList.map((p) => createSignatureHelpParameterForParameter(p, checker, enclosingDeclaration, sourceFile, printer)),
                prefix: [...typeParameterParts, punctuationPart(20 /* OpenParenToken */)],
                suffix: [punctuationPart(21 /* CloseParenToken */)]
            }));
        }