function itemInfoForTypeParameters(candidateSignature, checker, enclosingDeclaration, sourceFile) {
            const typeParameters = (candidateSignature.target || candidateSignature).typeParameters;
            const printer = createPrinterWithRemoveComments();
            const parameters = (typeParameters || emptyArray).map((t) => createSignatureHelpParameterForTypeParameter(t, checker, enclosingDeclaration, sourceFile, printer));
            const thisParameter = candidateSignature.thisParameter ? [checker.symbolToParameterDeclaration(candidateSignature.thisParameter, enclosingDeclaration, signatureHelpNodeBuilderFlags)] : [];
            return checker.getExpandedParameters(candidateSignature).map((paramList) => {
                const params = factory.createNodeArray([...thisParameter, ...map(paramList, (param) => checker.symbolToParameterDeclaration(param, enclosingDeclaration, signatureHelpNodeBuilderFlags))]);
                const parameterParts = mapToDisplayParts((writer) => {
                    printer.writeList(2576 /* CallExpressionArguments */, params, sourceFile, writer);
                });
                return { isVariadic: false, parameters, prefix: [punctuationPart(29 /* LessThanToken */)], suffix: [punctuationPart(31 /* GreaterThanToken */), ...parameterParts] };
            });
        }