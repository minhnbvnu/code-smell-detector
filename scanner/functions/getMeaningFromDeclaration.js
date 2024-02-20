function getMeaningFromDeclaration(node) {
            switch (node.kind) {
                case 257 /* VariableDeclaration */:
                    return isInJSFile(node) && getJSDocEnumTag(node) ? 7 /* All */ : 1 /* Value */;
                case 166 /* Parameter */:
                case 205 /* BindingElement */:
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                case 299 /* PropertyAssignment */:
                case 300 /* ShorthandPropertyAssignment */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 173 /* Constructor */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                case 295 /* CatchClause */:
                case 288 /* JsxAttribute */:
                    return 1 /* Value */;
                case 165 /* TypeParameter */:
                case 261 /* InterfaceDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                case 184 /* TypeLiteral */:
                    return 2 /* Type */;
                case 349 /* JSDocTypedefTag */:
                    return node.name === void 0 ? 1 /* Value */ | 2 /* Type */ : 2 /* Type */;
                case 302 /* EnumMember */:
                case 260 /* ClassDeclaration */:
                    return 1 /* Value */ | 2 /* Type */;
                case 264 /* ModuleDeclaration */:
                    if (isAmbientModule(node)) {
                        return 4 /* Namespace */ | 1 /* Value */;
                    }
                    else if (getModuleInstanceState(node) === 1 /* Instantiated */) {
                        return 4 /* Namespace */ | 1 /* Value */;
                    }
                    else {
                        return 4 /* Namespace */;
                    }
                case 263 /* EnumDeclaration */:
                case 272 /* NamedImports */:
                case 273 /* ImportSpecifier */:
                case 268 /* ImportEqualsDeclaration */:
                case 269 /* ImportDeclaration */:
                case 274 /* ExportAssignment */:
                case 275 /* ExportDeclaration */:
                    return 7 /* All */;
                case 308 /* SourceFile */:
                    return 4 /* Namespace */ | 1 /* Value */;
            }
            return 7 /* All */;
        }