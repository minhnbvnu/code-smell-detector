function addSignatureDisplayParts(signature, allSignatures, flags = 0 /* None */) {
                addRange(displayParts, signatureToDisplayParts(typeChecker, signature, enclosingDeclaration, flags | 32 /* WriteTypeArgumentsOfSignature */));
                if (allSignatures.length > 1) {
                    displayParts.push(spacePart());
                    displayParts.push(punctuationPart(20 /* OpenParenToken */));
                    displayParts.push(operatorPart(39 /* PlusToken */));
                    displayParts.push(displayPart((allSignatures.length - 1).toString(), 7 /* numericLiteral */));
                    displayParts.push(spacePart());
                    displayParts.push(textPart(allSignatures.length === 2 ? "overload" : "overloads"));
                    displayParts.push(punctuationPart(21 /* CloseParenToken */));
                }
                documentation = signature.getDocumentationComment(typeChecker);
                tags = signature.getJsDocTags();
                if (allSignatures.length > 1 && documentation.length === 0 && tags.length === 0) {
                    documentation = allSignatures[0].getDocumentationComment(typeChecker);
                    tags = allSignatures[0].getJsDocTags().filter((tag) => tag.name !== "deprecated");
                }
            }