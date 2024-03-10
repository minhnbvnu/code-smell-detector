function checkSourceElementWorker(node) {
                if (canHaveJSDoc(node)) {
                    forEach(node.jsDoc, ({ comment, tags }) => {
                        checkJSDocCommentWorker(comment);
                        forEach(tags, (tag) => {
                            checkJSDocCommentWorker(tag.comment);
                            if (isInJSFile(node)) {
                                checkSourceElement(tag);
                            }
                        });
                    });
                }
                const kind = node.kind;
                if (cancellationToken) {
                    switch (kind) {
                        case 264 /* ModuleDeclaration */:
                        case 260 /* ClassDeclaration */:
                        case 261 /* InterfaceDeclaration */:
                        case 259 /* FunctionDeclaration */:
                            cancellationToken.throwIfCancellationRequested();
                    }
                }
                if (kind >= 240 /* FirstStatement */ && kind <= 256 /* LastStatement */ && canHaveFlowNode(node) && node.flowNode && !isReachableFlowNode(node.flowNode)) {
                    errorOrSuggestion(compilerOptions.allowUnreachableCode === false, node, Diagnostics.Unreachable_code_detected);
                }
                switch (kind) {
                    case 165 /* TypeParameter */:
                        return checkTypeParameter(node);
                    case 166 /* Parameter */:
                        return checkParameter(node);
                    case 169 /* PropertyDeclaration */:
                        return checkPropertyDeclaration(node);
                    case 168 /* PropertySignature */:
                        return checkPropertySignature(node);
                    case 182 /* ConstructorType */:
                    case 181 /* FunctionType */:
                    case 176 /* CallSignature */:
                    case 177 /* ConstructSignature */:
                    case 178 /* IndexSignature */:
                        return checkSignatureDeclaration(node);
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                        return checkMethodDeclaration(node);
                    case 172 /* ClassStaticBlockDeclaration */:
                        return checkClassStaticBlockDeclaration(node);
                    case 173 /* Constructor */:
                        return checkConstructorDeclaration(node);
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return checkAccessorDeclaration(node);
                    case 180 /* TypeReference */:
                        return checkTypeReferenceNode(node);
                    case 179 /* TypePredicate */:
                        return checkTypePredicate(node);
                    case 183 /* TypeQuery */:
                        return checkTypeQuery(node);
                    case 184 /* TypeLiteral */:
                        return checkTypeLiteral(node);
                    case 185 /* ArrayType */:
                        return checkArrayType(node);
                    case 186 /* TupleType */:
                        return checkTupleType(node);
                    case 189 /* UnionType */:
                    case 190 /* IntersectionType */:
                        return checkUnionOrIntersectionType(node);
                    case 193 /* ParenthesizedType */:
                    case 187 /* OptionalType */:
                    case 188 /* RestType */:
                        return checkSourceElement(node.type);
                    case 194 /* ThisType */:
                        return checkThisType(node);
                    case 195 /* TypeOperator */:
                        return checkTypeOperator(node);
                    case 191 /* ConditionalType */:
                        return checkConditionalType(node);
                    case 192 /* InferType */:
                        return checkInferType(node);
                    case 200 /* TemplateLiteralType */:
                        return checkTemplateLiteralType(node);
                    case 202 /* ImportType */:
                        return checkImportType(node);
                    case 199 /* NamedTupleMember */:
                        return checkNamedTupleMember(node);
                    case 331 /* JSDocAugmentsTag */:
                        return checkJSDocAugmentsTag(node);
                    case 332 /* JSDocImplementsTag */:
                        return checkJSDocImplementsTag(node);
                    case 349 /* JSDocTypedefTag */:
                    case 341 /* JSDocCallbackTag */:
                    case 343 /* JSDocEnumTag */:
                        return checkJSDocTypeAliasTag(node);
                    case 348 /* JSDocTemplateTag */:
                        return checkJSDocTemplateTag(node);
                    case 347 /* JSDocTypeTag */:
                        return checkJSDocTypeTag(node);
                    case 327 /* JSDocLink */:
                    case 328 /* JSDocLinkCode */:
                    case 329 /* JSDocLinkPlain */:
                        return checkJSDocLinkLikeTag(node);
                    case 344 /* JSDocParameterTag */:
                        return checkJSDocParameterTag(node);
                    case 351 /* JSDocPropertyTag */:
                        return checkJSDocPropertyTag(node);
                    case 320 /* JSDocFunctionType */:
                        checkJSDocFunctionType(node);
                    case 318 /* JSDocNonNullableType */:
                    case 317 /* JSDocNullableType */:
                    case 315 /* JSDocAllType */:
                    case 316 /* JSDocUnknownType */:
                    case 325 /* JSDocTypeLiteral */:
                        checkJSDocTypeIsInJsFile(node);
                        forEachChild(node, checkSourceElement);
                        return;
                    case 321 /* JSDocVariadicType */:
                        checkJSDocVariadicType(node);
                        return;
                    case 312 /* JSDocTypeExpression */:
                        return checkSourceElement(node.type);
                    case 336 /* JSDocPublicTag */:
                    case 338 /* JSDocProtectedTag */:
                    case 337 /* JSDocPrivateTag */:
                        return checkJSDocAccessibilityModifiers(node);
                    case 353 /* JSDocSatisfiesTag */:
                        return checkJSDocSatisfiesTag(node);
                    case 196 /* IndexedAccessType */:
                        return checkIndexedAccessType(node);
                    case 197 /* MappedType */:
                        return checkMappedType(node);
                    case 259 /* FunctionDeclaration */:
                        return checkFunctionDeclaration(node);
                    case 238 /* Block */:
                    case 265 /* ModuleBlock */:
                        return checkBlock(node);
                    case 240 /* VariableStatement */:
                        return checkVariableStatement(node);
                    case 241 /* ExpressionStatement */:
                        return checkExpressionStatement(node);
                    case 242 /* IfStatement */:
                        return checkIfStatement(node);
                    case 243 /* DoStatement */:
                        return checkDoStatement(node);
                    case 244 /* WhileStatement */:
                        return checkWhileStatement(node);
                    case 245 /* ForStatement */:
                        return checkForStatement(node);
                    case 246 /* ForInStatement */:
                        return checkForInStatement(node);
                    case 247 /* ForOfStatement */:
                        return checkForOfStatement(node);
                    case 248 /* ContinueStatement */:
                    case 249 /* BreakStatement */:
                        return checkBreakOrContinueStatement(node);
                    case 250 /* ReturnStatement */:
                        return checkReturnStatement(node);
                    case 251 /* WithStatement */:
                        return checkWithStatement(node);
                    case 252 /* SwitchStatement */:
                        return checkSwitchStatement(node);
                    case 253 /* LabeledStatement */:
                        return checkLabeledStatement(node);
                    case 254 /* ThrowStatement */:
                        return checkThrowStatement(node);
                    case 255 /* TryStatement */:
                        return checkTryStatement(node);
                    case 257 /* VariableDeclaration */:
                        return checkVariableDeclaration(node);
                    case 205 /* BindingElement */:
                        return checkBindingElement(node);
                    case 260 /* ClassDeclaration */:
                        return checkClassDeclaration(node);
                    case 261 /* InterfaceDeclaration */:
                        return checkInterfaceDeclaration(node);
                    case 262 /* TypeAliasDeclaration */:
                        return checkTypeAliasDeclaration(node);
                    case 263 /* EnumDeclaration */:
                        return checkEnumDeclaration(node);
                    case 264 /* ModuleDeclaration */:
                        return checkModuleDeclaration(node);
                    case 269 /* ImportDeclaration */:
                        return checkImportDeclaration(node);
                    case 268 /* ImportEqualsDeclaration */:
                        return checkImportEqualsDeclaration(node);
                    case 275 /* ExportDeclaration */:
                        return checkExportDeclaration(node);
                    case 274 /* ExportAssignment */:
                        return checkExportAssignment(node);
                    case 239 /* EmptyStatement */:
                    case 256 /* DebuggerStatement */:
                        checkGrammarStatementInAmbientContext(node);
                        return;
                    case 279 /* MissingDeclaration */:
                        return checkMissingDeclaration(node);
                }
            }