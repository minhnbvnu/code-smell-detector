function canHaveSymbol(node) {
            switch (node.kind) {
                case 216 /* ArrowFunction */:
                case 223 /* BinaryExpression */:
                case 205 /* BindingElement */:
                case 210 /* CallExpression */:
                case 176 /* CallSignature */:
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 172 /* ClassStaticBlockDeclaration */:
                case 173 /* Constructor */:
                case 182 /* ConstructorType */:
                case 177 /* ConstructSignature */:
                case 209 /* ElementAccessExpression */:
                case 263 /* EnumDeclaration */:
                case 302 /* EnumMember */:
                case 274 /* ExportAssignment */:
                case 275 /* ExportDeclaration */:
                case 278 /* ExportSpecifier */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 181 /* FunctionType */:
                case 174 /* GetAccessor */:
                case 79 /* Identifier */:
                case 270 /* ImportClause */:
                case 268 /* ImportEqualsDeclaration */:
                case 273 /* ImportSpecifier */:
                case 178 /* IndexSignature */:
                case 261 /* InterfaceDeclaration */:
                case 341 /* JSDocCallbackTag */:
                case 343 /* JSDocEnumTag */:
                case 320 /* JSDocFunctionType */:
                case 344 /* JSDocParameterTag */:
                case 351 /* JSDocPropertyTag */:
                case 326 /* JSDocSignature */:
                case 349 /* JSDocTypedefTag */:
                case 325 /* JSDocTypeLiteral */:
                case 288 /* JsxAttribute */:
                case 289 /* JsxAttributes */:
                case 290 /* JsxSpreadAttribute */:
                case 197 /* MappedType */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 264 /* ModuleDeclaration */:
                case 199 /* NamedTupleMember */:
                case 277 /* NamespaceExport */:
                case 267 /* NamespaceExportDeclaration */:
                case 271 /* NamespaceImport */:
                case 211 /* NewExpression */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                case 8 /* NumericLiteral */:
                case 207 /* ObjectLiteralExpression */:
                case 166 /* Parameter */:
                case 208 /* PropertyAccessExpression */:
                case 299 /* PropertyAssignment */:
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                case 175 /* SetAccessor */:
                case 300 /* ShorthandPropertyAssignment */:
                case 308 /* SourceFile */:
                case 301 /* SpreadAssignment */:
                case 10 /* StringLiteral */:
                case 262 /* TypeAliasDeclaration */:
                case 184 /* TypeLiteral */:
                case 165 /* TypeParameter */:
                case 257 /* VariableDeclaration */:
                    return true;
                default:
                    return false;
            }
        }