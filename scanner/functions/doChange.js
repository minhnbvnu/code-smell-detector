function doChange(changes, sourceFile, decl) {
            if (isFunctionLikeDeclaration(decl) && (getJSDocReturnType(decl) || decl.parameters.some((p) => !!getJSDocType(p)))) {
                if (!decl.typeParameters) {
                    const typeParameters = getJSDocTypeParameterDeclarations(decl);
                    if (typeParameters.length)
                        changes.insertTypeParameters(sourceFile, decl, typeParameters);
                }
                const needParens = isArrowFunction(decl) && !findChildOfKind(decl, 20 /* OpenParenToken */, sourceFile);
                if (needParens)
                    changes.insertNodeBefore(sourceFile, first(decl.parameters), factory.createToken(20 /* OpenParenToken */));
                for (const param of decl.parameters) {
                    if (!param.type) {
                        const paramType = getJSDocType(param);
                        if (paramType)
                            changes.tryInsertTypeAnnotation(sourceFile, param, visitNode(paramType, transformJSDocType, isTypeNode));
                    }
                }
                if (needParens)
                    changes.insertNodeAfter(sourceFile, last(decl.parameters), factory.createToken(21 /* CloseParenToken */));
                if (!decl.type) {
                    const returnType = getJSDocReturnType(decl);
                    if (returnType)
                        changes.tryInsertTypeAnnotation(sourceFile, decl, visitNode(returnType, transformJSDocType, isTypeNode));
                }
            }
            else {
                const jsdocType = Debug.checkDefined(getJSDocType(decl), "A JSDocType for this declaration should exist");
                Debug.assert(!decl.type, "The JSDocType decl should have a type");
                changes.tryInsertTypeAnnotation(sourceFile, decl, visitNode(jsdocType, transformJSDocType, isTypeNode));
            }
        }