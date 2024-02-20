function getInfo12(sourceFile, checker, pos) {
            if (isInJSFile(sourceFile)) {
                return void 0;
            }
            const token = getTokenAtPosition(sourceFile, pos);
            const func = findAncestor(token, isFunctionLikeDeclaration);
            const returnTypeNode = func == null ? void 0 : func.type;
            if (!returnTypeNode) {
                return void 0;
            }
            const returnType = checker.getTypeFromTypeNode(returnTypeNode);
            const promisedType = checker.getAwaitedType(returnType) || checker.getVoidType();
            const promisedTypeNode = checker.typeToTypeNode(promisedType, 
            /*enclosingDeclaration*/
            returnTypeNode, 
            /*flags*/
            void 0);
            if (promisedTypeNode) {
                return { returnTypeNode, returnType, promisedTypeNode, promisedType };
            }
        }