function canHaveJSDoc(node) {
            switch (node.kind) {
                case 216 /* ArrowFunction */:
                case 223 /* BinaryExpression */:
                case 238 /* Block */:
                case 249 /* BreakStatement */:
                case 176 /* CallSignature */:
                case 292 /* CaseClause */:
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 172 /* ClassStaticBlockDeclaration */:
                case 173 /* Constructor */:
                case 182 /* ConstructorType */:
                case 177 /* ConstructSignature */:
                case 248 /* ContinueStatement */:
                case 256 /* DebuggerStatement */:
                case 243 /* DoStatement */:
                case 209 /* ElementAccessExpression */:
                case 239 /* EmptyStatement */:
                case 1 /* EndOfFileToken */:
                case 263 /* EnumDeclaration */:
                case 302 /* EnumMember */:
                case 274 /* ExportAssignment */:
                case 275 /* ExportDeclaration */:
                case 278 /* ExportSpecifier */:
                case 241 /* ExpressionStatement */:
                case 246 /* ForInStatement */:
                case 247 /* ForOfStatement */:
                case 245 /* ForStatement */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 181 /* FunctionType */:
                case 174 /* GetAccessor */:
                case 79 /* Identifier */:
                case 242 /* IfStatement */:
                case 269 /* ImportDeclaration */:
                case 268 /* ImportEqualsDeclaration */:
                case 178 /* IndexSignature */:
                case 261 /* InterfaceDeclaration */:
                case 320 /* JSDocFunctionType */:
                case 326 /* JSDocSignature */:
                case 253 /* LabeledStatement */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 264 /* ModuleDeclaration */:
                case 199 /* NamedTupleMember */:
                case 267 /* NamespaceExportDeclaration */:
                case 207 /* ObjectLiteralExpression */:
                case 166 /* Parameter */:
                case 214 /* ParenthesizedExpression */:
                case 208 /* PropertyAccessExpression */:
                case 299 /* PropertyAssignment */:
                case 169 /* PropertyDeclaration */:
                case 168 /* PropertySignature */:
                case 250 /* ReturnStatement */:
                case 175 /* SetAccessor */:
                case 300 /* ShorthandPropertyAssignment */:
                case 301 /* SpreadAssignment */:
                case 252 /* SwitchStatement */:
                case 254 /* ThrowStatement */:
                case 255 /* TryStatement */:
                case 262 /* TypeAliasDeclaration */:
                case 165 /* TypeParameter */:
                case 257 /* VariableDeclaration */:
                case 240 /* VariableStatement */:
                case 244 /* WhileStatement */:
                case 251 /* WithStatement */:
                    return true;
                default:
                    return false;
            }
        }