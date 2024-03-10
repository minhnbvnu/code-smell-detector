function getErrorSpanForNode(sourceFile, node) {
            let errorNode = node;
            switch (node.kind) {
                case 308 /* SourceFile */:
                    const pos2 = skipTrivia(sourceFile.text, 0, 
                    /*stopAfterLineBreak*/
                    false);
                    if (pos2 === sourceFile.text.length) {
                        return createTextSpan(0, 0);
                    }
                    return getSpanOfTokenAtPosition(sourceFile, pos2);
                case 257 /* VariableDeclaration */:
                case 205 /* BindingElement */:
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 261 /* InterfaceDeclaration */:
                case 264 /* ModuleDeclaration */:
                case 263 /* EnumDeclaration */:
                case 302 /* EnumMember */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 262 /* TypeAliasDeclaration */:
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                case 271 /* NamespaceImport */:
                    errorNode = node.name;
                    break;
                case 216 /* ArrowFunction */:
                    return getErrorSpanForArrowFunction(sourceFile, node);
                case 292 /* CaseClause */:
                case 293 /* DefaultClause */:
                    const start = skipTrivia(sourceFile.text, node.pos);
                    const end = node.statements.length > 0 ? node.statements[0].pos : node.end;
                    return createTextSpanFromBounds(start, end);
            }
            if (errorNode === void 0) {
                return getSpanOfTokenAtPosition(sourceFile, node.pos);
            }
            Debug.assert(!isJSDoc(errorNode));
            const isMissing = nodeIsMissing(errorNode);
            const pos = isMissing || isJsxText(node) ? errorNode.pos : skipTrivia(sourceFile.text, errorNode.pos);
            if (isMissing) {
                Debug.assert(pos === errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
                Debug.assert(pos === errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
            }
            else {
                Debug.assert(pos >= errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
                Debug.assert(pos <= errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
            }
            return createTextSpanFromBounds(pos, errorNode.end);
        }