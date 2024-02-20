function getSignatureHelpItem(candidateSignature, callTargetDisplayParts, isTypeParameterList, checker, enclosingDeclaration, sourceFile) {
            const infos = (isTypeParameterList ? itemInfoForTypeParameters : itemInfoForParameters)(candidateSignature, checker, enclosingDeclaration, sourceFile);
            return map(infos, ({ isVariadic, parameters, prefix, suffix }) => {
                const prefixDisplayParts = [...callTargetDisplayParts, ...prefix];
                const suffixDisplayParts = [...suffix, ...returnTypeToDisplayParts(candidateSignature, enclosingDeclaration, checker)];
                const documentation = candidateSignature.getDocumentationComment(checker);
                const tags = candidateSignature.getJsDocTags();
                return { isVariadic, prefixDisplayParts, suffixDisplayParts, separatorDisplayParts, parameters, documentation, tags };
            });
        }