function getNodeKind(node) {
            switch (node.kind) {
                case 308 /* SourceFile */:
                    return isExternalModule(node) ? "module" /* moduleElement */ : "script" /* scriptElement */;
                case 264 /* ModuleDeclaration */:
                    return "module" /* moduleElement */;
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                    return "class" /* classElement */;
                case 261 /* InterfaceDeclaration */:
                    return "interface" /* interfaceElement */;
                case 262 /* TypeAliasDeclaration */:
                case 341 /* JSDocCallbackTag */:
                case 349 /* JSDocTypedefTag */:
                    return "type" /* typeElement */;
                case 263 /* EnumDeclaration */:
                    return "enum" /* enumElement */;
                case 257 /* VariableDeclaration */:
                    return getKindOfVariableDeclaration(node);
                case 205 /* BindingElement */:
                    return getKindOfVariableDeclaration(getRootDeclaration(node));
                case 216 /* ArrowFunction */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                    return "function" /* functionElement */;
                case 174 /* GetAccessor */:
                    return "getter" /* memberGetAccessorElement */;
                case 175 /* SetAccessor */:
                    return "setter" /* memberSetAccessorElement */;
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                    return "method" /* memberFunctionElement */;
                case 299 /* PropertyAssignment */:
                    const { initializer } = node;
                    return isFunctionLike(initializer) ? "method" /* memberFunctionElement */ : "property" /* memberVariableElement */;
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                case 300 /* ShorthandPropertyAssignment */:
                case 301 /* SpreadAssignment */:
                    return "property" /* memberVariableElement */;
                case 178 /* IndexSignature */:
                    return "index" /* indexSignatureElement */;
                case 177 /* ConstructSignature */:
                    return "construct" /* constructSignatureElement */;
                case 176 /* CallSignature */:
                    return "call" /* callSignatureElement */;
                case 173 /* Constructor */:
                case 172 /* ClassStaticBlockDeclaration */:
                    return "constructor" /* constructorImplementationElement */;
                case 165 /* TypeParameter */:
                    return "type parameter" /* typeParameterElement */;
                case 302 /* EnumMember */:
                    return "enum member" /* enumMemberElement */;
                case 166 /* Parameter */:
                    return hasSyntacticModifier(node, 16476 /* ParameterPropertyModifier */) ? "property" /* memberVariableElement */ : "parameter" /* parameterElement */;
                case 268 /* ImportEqualsDeclaration */:
                case 273 /* ImportSpecifier */:
                case 278 /* ExportSpecifier */:
                case 271 /* NamespaceImport */:
                case 277 /* NamespaceExport */:
                    return "alias" /* alias */;
                case 223 /* BinaryExpression */:
                    const kind = getAssignmentDeclarationKind(node);
                    const { right } = node;
                    switch (kind) {
                        case 7 /* ObjectDefinePropertyValue */:
                        case 8 /* ObjectDefinePropertyExports */:
                        case 9 /* ObjectDefinePrototypeProperty */:
                        case 0 /* None */:
                            return "" /* unknown */;
                        case 1 /* ExportsProperty */:
                        case 2 /* ModuleExports */:
                            const rightKind = getNodeKind(right);
                            return rightKind === "" /* unknown */ ? "const" /* constElement */ : rightKind;
                        case 3 /* PrototypeProperty */:
                            return isFunctionExpression(right) ? "method" /* memberFunctionElement */ : "property" /* memberVariableElement */;
                        case 4 /* ThisProperty */:
                            return "property" /* memberVariableElement */;
                        case 5 /* Property */:
                            return isFunctionExpression(right) ? "method" /* memberFunctionElement */ : "property" /* memberVariableElement */;
                        case 6 /* Prototype */:
                            return "local class" /* localClassElement */;
                        default: {
                            assertType(kind);
                            return "" /* unknown */;
                        }
                    }
                case 79 /* Identifier */:
                    return isImportClause(node.parent) ? "alias" /* alias */ : "" /* unknown */;
                case 274 /* ExportAssignment */:
                    const scriptKind = getNodeKind(node.expression);
                    return scriptKind === "" /* unknown */ ? "const" /* constElement */ : scriptKind;
                default:
                    return "" /* unknown */;
            }
            function getKindOfVariableDeclaration(v) {
                return isVarConst(v) ? "const" /* constElement */ : isLet(v) ? "let" /* letElement */ : "var" /* variableElement */;
            }
        }