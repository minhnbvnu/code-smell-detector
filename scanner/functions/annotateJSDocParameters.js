function annotateJSDocParameters(changes, sourceFile, parameterInferences, program, host) {
            const signature = parameterInferences.length && parameterInferences[0].declaration.parent;
            if (!signature) {
                return;
            }
            const inferences = mapDefined(parameterInferences, (inference) => {
                const param = inference.declaration;
                if (param.initializer || getJSDocType(param) || !isIdentifier(param.name)) {
                    return;
                }
                const typeNode = inference.type && getTypeNodeIfAccessible(inference.type, param, program, host);
                if (typeNode) {
                    const name = factory.cloneNode(param.name);
                    setEmitFlags(name, 3072 /* NoComments */ | 4096 /* NoNestedComments */);
                    return { name: factory.cloneNode(param.name), param, isOptional: !!inference.isOptional, typeNode };
                }
            });
            if (!inferences.length) {
                return;
            }
            if (isArrowFunction(signature) || isFunctionExpression(signature)) {
                const needParens = isArrowFunction(signature) && !findChildOfKind(signature, 20 /* OpenParenToken */, sourceFile);
                if (needParens) {
                    changes.insertNodeBefore(sourceFile, first(signature.parameters), factory.createToken(20 /* OpenParenToken */));
                }
                forEach(inferences, ({ typeNode, param }) => {
                    const typeTag = factory.createJSDocTypeTag(
                    /*tagName*/
                    void 0, factory.createJSDocTypeExpression(typeNode));
                    const jsDoc = factory.createJSDocComment(
                    /*comment*/
                    void 0, [typeTag]);
                    changes.insertNodeAt(sourceFile, param.getStart(sourceFile), jsDoc, { suffix: " " });
                });
                if (needParens) {
                    changes.insertNodeAfter(sourceFile, last(signature.parameters), factory.createToken(21 /* CloseParenToken */));
                }
            }
            else {
                const paramTags = map(inferences, ({ name, typeNode, isOptional }) => factory.createJSDocParameterTag(
                /*tagName*/
                void 0, name, 
                /*isBracketed*/
                !!isOptional, factory.createJSDocTypeExpression(typeNode), 
                /* isNameFirst */
                false, 
                /*comment*/
                void 0));
                changes.addJSDocTags(sourceFile, signature, paramTags);
            }
        }