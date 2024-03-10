function getCommentOwnerInfoWorker(commentOwner, options) {
            switch (commentOwner.kind) {
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 171 /* MethodDeclaration */:
                case 173 /* Constructor */:
                case 170 /* MethodSignature */:
                case 216 /* ArrowFunction */:
                    const host = commentOwner;
                    return { commentOwner, parameters: host.parameters, hasReturn: hasReturn(host, options) };
                case 299 /* PropertyAssignment */:
                    return getCommentOwnerInfoWorker(commentOwner.initializer, options);
                case 260 /* ClassDeclaration */:
                case 261 /* InterfaceDeclaration */:
                case 263 /* EnumDeclaration */:
                case 302 /* EnumMember */:
                case 262 /* TypeAliasDeclaration */:
                    return { commentOwner };
                case 168 /* PropertySignature */: {
                    const host2 = commentOwner;
                    return host2.type && isFunctionTypeNode(host2.type) ? { commentOwner, parameters: host2.type.parameters, hasReturn: hasReturn(host2.type, options) } : { commentOwner };
                }
                case 240 /* VariableStatement */: {
                    const varStatement = commentOwner;
                    const varDeclarations = varStatement.declarationList.declarations;
                    const host2 = varDeclarations.length === 1 && varDeclarations[0].initializer ? getRightHandSideOfAssignment(varDeclarations[0].initializer) : void 0;
                    return host2 ? { commentOwner, parameters: host2.parameters, hasReturn: hasReturn(host2, options) } : { commentOwner };
                }
                case 308 /* SourceFile */:
                    return "quit";
                case 264 /* ModuleDeclaration */:
                    return commentOwner.parent.kind === 264 /* ModuleDeclaration */ ? void 0 : { commentOwner };
                case 241 /* ExpressionStatement */:
                    return getCommentOwnerInfoWorker(commentOwner.expression, options);
                case 223 /* BinaryExpression */: {
                    const be = commentOwner;
                    if (getAssignmentDeclarationKind(be) === 0 /* None */) {
                        return "quit";
                    }
                    return isFunctionLike(be.right) ? { commentOwner, parameters: be.right.parameters, hasReturn: hasReturn(be.right, options) } : { commentOwner };
                }
                case 169 /* PropertyDeclaration */:
                    const init = commentOwner.initializer;
                    if (init && (isFunctionExpression(init) || isArrowFunction(init))) {
                        return { commentOwner, parameters: init.parameters, hasReturn: hasReturn(init, options) };
                    }
            }
        }