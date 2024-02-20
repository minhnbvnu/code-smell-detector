function transformClassMethodDeclarationToStatement(receiver, member, container) {
                const commentRange = getCommentRange(member);
                const sourceMapRange = getSourceMapRange(member);
                const memberFunction = transformFunctionLikeToExpression(member, 
                /*location*/
                member, 
                /*name*/
                void 0, container);
                const propertyName = visitNode(member.name, visitor, isPropertyName);
                Debug.assert(propertyName);
                let e;
                if (!isPrivateIdentifier(propertyName) && getUseDefineForClassFields(context.getCompilerOptions())) {
                    const name = isComputedPropertyName(propertyName) ? propertyName.expression : isIdentifier(propertyName) ? factory2.createStringLiteral(unescapeLeadingUnderscores(propertyName.escapedText)) : propertyName;
                    e = factory2.createObjectDefinePropertyCall(receiver, name, factory2.createPropertyDescriptor({ value: memberFunction, enumerable: false, writable: true, configurable: true }));
                }
                else {
                    const memberName = createMemberAccessForPropertyName(factory2, receiver, propertyName, 
                    /*location*/
                    member.name);
                    e = factory2.createAssignment(memberName, memberFunction);
                }
                setEmitFlags(memberFunction, 3072 /* NoComments */);
                setSourceMapRange(memberFunction, sourceMapRange);
                const statement = setTextRange(factory2.createExpressionStatement(e), 
                /*location*/
                member);
                setOriginalNode(statement, member);
                setCommentRange(statement, commentRange);
                setEmitFlags(statement, 96 /* NoSourceMap */);
                return statement;
            }