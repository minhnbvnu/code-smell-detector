function declarationIsWriteAccess(decl) {
            if (!!(decl.flags & 16777216 /* Ambient */))
                return true;
            switch (decl.kind) {
                case 223 /* BinaryExpression */:
                case 205 /* BindingElement */:
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 88 /* DefaultKeyword */:
                case 263 /* EnumDeclaration */:
                case 302 /* EnumMember */:
                case 278 /* ExportSpecifier */:
                case 270 /* ImportClause */:
                case 268 /* ImportEqualsDeclaration */:
                case 273 /* ImportSpecifier */:
                case 261 /* InterfaceDeclaration */:
                case 341 /* JSDocCallbackTag */:
                case 349 /* JSDocTypedefTag */:
                case 288 /* JsxAttribute */:
                case 264 /* ModuleDeclaration */:
                case 267 /* NamespaceExportDeclaration */:
                case 271 /* NamespaceImport */:
                case 277 /* NamespaceExport */:
                case 166 /* Parameter */:
                case 300 /* ShorthandPropertyAssignment */:
                case 262 /* TypeAliasDeclaration */:
                case 165 /* TypeParameter */:
                    return true;
                case 299 /* PropertyAssignment */:
                    return !isArrayLiteralOrObjectLiteralDestructuringPattern(decl.parent);
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 173 /* Constructor */:
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                    return !!decl.body;
                case 257 /* VariableDeclaration */:
                case 169 /* PropertyDeclaration */:
                    return !!decl.initializer || isCatchClause(decl.parent);
                case 170 /* MethodSignature */:
                case 168 /* PropertySignature */:
                case 351 /* JSDocPropertyTag */:
                case 344 /* JSDocParameterTag */:
                    return false;
                default:
                    return Debug.failBadSyntaxKind(decl);
            }
        }