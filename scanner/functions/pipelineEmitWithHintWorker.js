function pipelineEmitWithHintWorker(hint, node, allowSnippets = true) {
                if (allowSnippets) {
                    const snippet = getSnippetElement(node);
                    if (snippet) {
                        return emitSnippetNode(hint, node, snippet);
                    }
                }
                if (hint === 0 /* SourceFile */)
                    return emitSourceFile(cast(node, isSourceFile));
                if (hint === 2 /* IdentifierName */)
                    return emitIdentifier(cast(node, isIdentifier));
                if (hint === 6 /* JsxAttributeValue */)
                    return emitLiteral(cast(node, isStringLiteral), 
                    /*jsxAttributeEscape*/
                    true);
                if (hint === 3 /* MappedTypeParameter */)
                    return emitMappedTypeParameter(cast(node, isTypeParameterDeclaration));
                if (hint === 5 /* EmbeddedStatement */) {
                    Debug.assertNode(node, isEmptyStatement);
                    return emitEmptyStatement(
                    /*isEmbeddedStatement*/
                    true);
                }
                if (hint === 4 /* Unspecified */) {
                    switch (node.kind) {
                        case 15 /* TemplateHead */:
                        case 16 /* TemplateMiddle */:
                        case 17 /* TemplateTail */:
                            return emitLiteral(node, 
                            /*jsxAttributeEscape*/
                            false);
                        case 79 /* Identifier */:
                            return emitIdentifier(node);
                        case 80 /* PrivateIdentifier */:
                            return emitPrivateIdentifier(node);
                        case 163 /* QualifiedName */:
                            return emitQualifiedName(node);
                        case 164 /* ComputedPropertyName */:
                            return emitComputedPropertyName(node);
                        case 165 /* TypeParameter */:
                            return emitTypeParameter(node);
                        case 166 /* Parameter */:
                            return emitParameter(node);
                        case 167 /* Decorator */:
                            return emitDecorator(node);
                        case 168 /* PropertySignature */:
                            return emitPropertySignature(node);
                        case 169 /* PropertyDeclaration */:
                            return emitPropertyDeclaration(node);
                        case 170 /* MethodSignature */:
                            return emitMethodSignature(node);
                        case 171 /* MethodDeclaration */:
                            return emitMethodDeclaration(node);
                        case 172 /* ClassStaticBlockDeclaration */:
                            return emitClassStaticBlockDeclaration(node);
                        case 173 /* Constructor */:
                            return emitConstructor(node);
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            return emitAccessorDeclaration(node);
                        case 176 /* CallSignature */:
                            return emitCallSignature(node);
                        case 177 /* ConstructSignature */:
                            return emitConstructSignature(node);
                        case 178 /* IndexSignature */:
                            return emitIndexSignature(node);
                        case 179 /* TypePredicate */:
                            return emitTypePredicate(node);
                        case 180 /* TypeReference */:
                            return emitTypeReference(node);
                        case 181 /* FunctionType */:
                            return emitFunctionType(node);
                        case 182 /* ConstructorType */:
                            return emitConstructorType(node);
                        case 183 /* TypeQuery */:
                            return emitTypeQuery(node);
                        case 184 /* TypeLiteral */:
                            return emitTypeLiteral(node);
                        case 185 /* ArrayType */:
                            return emitArrayType(node);
                        case 186 /* TupleType */:
                            return emitTupleType(node);
                        case 187 /* OptionalType */:
                            return emitOptionalType(node);
                        case 189 /* UnionType */:
                            return emitUnionType(node);
                        case 190 /* IntersectionType */:
                            return emitIntersectionType(node);
                        case 191 /* ConditionalType */:
                            return emitConditionalType(node);
                        case 192 /* InferType */:
                            return emitInferType(node);
                        case 193 /* ParenthesizedType */:
                            return emitParenthesizedType(node);
                        case 230 /* ExpressionWithTypeArguments */:
                            return emitExpressionWithTypeArguments(node);
                        case 194 /* ThisType */:
                            return emitThisType();
                        case 195 /* TypeOperator */:
                            return emitTypeOperator(node);
                        case 196 /* IndexedAccessType */:
                            return emitIndexedAccessType(node);
                        case 197 /* MappedType */:
                            return emitMappedType(node);
                        case 198 /* LiteralType */:
                            return emitLiteralType(node);
                        case 199 /* NamedTupleMember */:
                            return emitNamedTupleMember(node);
                        case 200 /* TemplateLiteralType */:
                            return emitTemplateType(node);
                        case 201 /* TemplateLiteralTypeSpan */:
                            return emitTemplateTypeSpan(node);
                        case 202 /* ImportType */:
                            return emitImportTypeNode(node);
                        case 203 /* ObjectBindingPattern */:
                            return emitObjectBindingPattern(node);
                        case 204 /* ArrayBindingPattern */:
                            return emitArrayBindingPattern(node);
                        case 205 /* BindingElement */:
                            return emitBindingElement(node);
                        case 236 /* TemplateSpan */:
                            return emitTemplateSpan(node);
                        case 237 /* SemicolonClassElement */:
                            return emitSemicolonClassElement();
                        case 238 /* Block */:
                            return emitBlock(node);
                        case 240 /* VariableStatement */:
                            return emitVariableStatement(node);
                        case 239 /* EmptyStatement */:
                            return emitEmptyStatement(
                            /*isEmbeddedStatement*/
                            false);
                        case 241 /* ExpressionStatement */:
                            return emitExpressionStatement(node);
                        case 242 /* IfStatement */:
                            return emitIfStatement(node);
                        case 243 /* DoStatement */:
                            return emitDoStatement(node);
                        case 244 /* WhileStatement */:
                            return emitWhileStatement(node);
                        case 245 /* ForStatement */:
                            return emitForStatement(node);
                        case 246 /* ForInStatement */:
                            return emitForInStatement(node);
                        case 247 /* ForOfStatement */:
                            return emitForOfStatement(node);
                        case 248 /* ContinueStatement */:
                            return emitContinueStatement(node);
                        case 249 /* BreakStatement */:
                            return emitBreakStatement(node);
                        case 250 /* ReturnStatement */:
                            return emitReturnStatement(node);
                        case 251 /* WithStatement */:
                            return emitWithStatement(node);
                        case 252 /* SwitchStatement */:
                            return emitSwitchStatement(node);
                        case 253 /* LabeledStatement */:
                            return emitLabeledStatement(node);
                        case 254 /* ThrowStatement */:
                            return emitThrowStatement(node);
                        case 255 /* TryStatement */:
                            return emitTryStatement(node);
                        case 256 /* DebuggerStatement */:
                            return emitDebuggerStatement(node);
                        case 257 /* VariableDeclaration */:
                            return emitVariableDeclaration(node);
                        case 258 /* VariableDeclarationList */:
                            return emitVariableDeclarationList(node);
                        case 259 /* FunctionDeclaration */:
                            return emitFunctionDeclaration(node);
                        case 260 /* ClassDeclaration */:
                            return emitClassDeclaration(node);
                        case 261 /* InterfaceDeclaration */:
                            return emitInterfaceDeclaration(node);
                        case 262 /* TypeAliasDeclaration */:
                            return emitTypeAliasDeclaration(node);
                        case 263 /* EnumDeclaration */:
                            return emitEnumDeclaration(node);
                        case 264 /* ModuleDeclaration */:
                            return emitModuleDeclaration(node);
                        case 265 /* ModuleBlock */:
                            return emitModuleBlock(node);
                        case 266 /* CaseBlock */:
                            return emitCaseBlock(node);
                        case 267 /* NamespaceExportDeclaration */:
                            return emitNamespaceExportDeclaration(node);
                        case 268 /* ImportEqualsDeclaration */:
                            return emitImportEqualsDeclaration(node);
                        case 269 /* ImportDeclaration */:
                            return emitImportDeclaration(node);
                        case 270 /* ImportClause */:
                            return emitImportClause(node);
                        case 271 /* NamespaceImport */:
                            return emitNamespaceImport(node);
                        case 277 /* NamespaceExport */:
                            return emitNamespaceExport(node);
                        case 272 /* NamedImports */:
                            return emitNamedImports(node);
                        case 273 /* ImportSpecifier */:
                            return emitImportSpecifier(node);
                        case 274 /* ExportAssignment */:
                            return emitExportAssignment(node);
                        case 275 /* ExportDeclaration */:
                            return emitExportDeclaration(node);
                        case 276 /* NamedExports */:
                            return emitNamedExports(node);
                        case 278 /* ExportSpecifier */:
                            return emitExportSpecifier(node);
                        case 296 /* AssertClause */:
                            return emitAssertClause(node);
                        case 297 /* AssertEntry */:
                            return emitAssertEntry(node);
                        case 279 /* MissingDeclaration */:
                            return;
                        case 280 /* ExternalModuleReference */:
                            return emitExternalModuleReference(node);
                        case 11 /* JsxText */:
                            return emitJsxText(node);
                        case 283 /* JsxOpeningElement */:
                        case 286 /* JsxOpeningFragment */:
                            return emitJsxOpeningElementOrFragment(node);
                        case 284 /* JsxClosingElement */:
                        case 287 /* JsxClosingFragment */:
                            return emitJsxClosingElementOrFragment(node);
                        case 288 /* JsxAttribute */:
                            return emitJsxAttribute(node);
                        case 289 /* JsxAttributes */:
                            return emitJsxAttributes(node);
                        case 290 /* JsxSpreadAttribute */:
                            return emitJsxSpreadAttribute(node);
                        case 291 /* JsxExpression */:
                            return emitJsxExpression(node);
                        case 292 /* CaseClause */:
                            return emitCaseClause(node);
                        case 293 /* DefaultClause */:
                            return emitDefaultClause(node);
                        case 294 /* HeritageClause */:
                            return emitHeritageClause(node);
                        case 295 /* CatchClause */:
                            return emitCatchClause(node);
                        case 299 /* PropertyAssignment */:
                            return emitPropertyAssignment(node);
                        case 300 /* ShorthandPropertyAssignment */:
                            return emitShorthandPropertyAssignment(node);
                        case 301 /* SpreadAssignment */:
                            return emitSpreadAssignment(node);
                        case 302 /* EnumMember */:
                            return emitEnumMember(node);
                        case 303 /* UnparsedPrologue */:
                            return writeUnparsedNode(node);
                        case 310 /* UnparsedSource */:
                        case 304 /* UnparsedPrepend */:
                            return emitUnparsedSourceOrPrepend(node);
                        case 305 /* UnparsedText */:
                        case 306 /* UnparsedInternalText */:
                            return emitUnparsedTextLike(node);
                        case 307 /* UnparsedSyntheticReference */:
                            return emitUnparsedSyntheticReference(node);
                        case 308 /* SourceFile */:
                            return emitSourceFile(node);
                        case 309 /* Bundle */:
                            return Debug.fail("Bundles should be printed using printBundle");
                        case 311 /* InputFiles */:
                            return Debug.fail("InputFiles should not be printed");
                        case 312 /* JSDocTypeExpression */:
                            return emitJSDocTypeExpression(node);
                        case 313 /* JSDocNameReference */:
                            return emitJSDocNameReference(node);
                        case 315 /* JSDocAllType */:
                            return writePunctuation("*");
                        case 316 /* JSDocUnknownType */:
                            return writePunctuation("?");
                        case 317 /* JSDocNullableType */:
                            return emitJSDocNullableType(node);
                        case 318 /* JSDocNonNullableType */:
                            return emitJSDocNonNullableType(node);
                        case 319 /* JSDocOptionalType */:
                            return emitJSDocOptionalType(node);
                        case 320 /* JSDocFunctionType */:
                            return emitJSDocFunctionType(node);
                        case 188 /* RestType */:
                        case 321 /* JSDocVariadicType */:
                            return emitRestOrJSDocVariadicType(node);
                        case 322 /* JSDocNamepathType */:
                            return;
                        case 323 /* JSDoc */:
                            return emitJSDoc(node);
                        case 325 /* JSDocTypeLiteral */:
                            return emitJSDocTypeLiteral(node);
                        case 326 /* JSDocSignature */:
                            return emitJSDocSignature(node);
                        case 330 /* JSDocTag */:
                        case 335 /* JSDocClassTag */:
                        case 340 /* JSDocOverrideTag */:
                            return emitJSDocSimpleTag(node);
                        case 331 /* JSDocAugmentsTag */:
                        case 332 /* JSDocImplementsTag */:
                            return emitJSDocHeritageTag(node);
                        case 333 /* JSDocAuthorTag */:
                        case 334 /* JSDocDeprecatedTag */:
                            return;
                        case 336 /* JSDocPublicTag */:
                        case 337 /* JSDocPrivateTag */:
                        case 338 /* JSDocProtectedTag */:
                        case 339 /* JSDocReadonlyTag */:
                            return;
                        case 341 /* JSDocCallbackTag */:
                            return emitJSDocCallbackTag(node);
                        case 342 /* JSDocOverloadTag */:
                            return emitJSDocOverloadTag(node);
                        case 344 /* JSDocParameterTag */:
                        case 351 /* JSDocPropertyTag */:
                            return emitJSDocPropertyLikeTag(node);
                        case 343 /* JSDocEnumTag */:
                        case 345 /* JSDocReturnTag */:
                        case 346 /* JSDocThisTag */:
                        case 347 /* JSDocTypeTag */:
                        case 352 /* JSDocThrowsTag */:
                        case 353 /* JSDocSatisfiesTag */:
                            return emitJSDocSimpleTypedTag(node);
                        case 348 /* JSDocTemplateTag */:
                            return emitJSDocTemplateTag(node);
                        case 349 /* JSDocTypedefTag */:
                            return emitJSDocTypedefTag(node);
                        case 350 /* JSDocSeeTag */:
                            return emitJSDocSeeTag(node);
                        case 355 /* NotEmittedStatement */:
                        case 359 /* EndOfDeclarationMarker */:
                        case 358 /* MergeDeclarationMarker */:
                            return;
                    }
                    if (isExpression(node)) {
                        hint = 1 /* Expression */;
                        if (substituteNode !== noEmitSubstitution) {
                            const substitute = substituteNode(hint, node) || node;
                            if (substitute !== node) {
                                node = substitute;
                                if (currentParenthesizerRule) {
                                    node = currentParenthesizerRule(node);
                                }
                            }
                        }
                    }
                }
                if (hint === 1 /* Expression */) {
                    switch (node.kind) {
                        case 8 /* NumericLiteral */:
                        case 9 /* BigIntLiteral */:
                            return emitNumericOrBigIntLiteral(node);
                        case 10 /* StringLiteral */:
                        case 13 /* RegularExpressionLiteral */:
                        case 14 /* NoSubstitutionTemplateLiteral */:
                            return emitLiteral(node, 
                            /*jsxAttributeEscape*/
                            false);
                        case 79 /* Identifier */:
                            return emitIdentifier(node);
                        case 80 /* PrivateIdentifier */:
                            return emitPrivateIdentifier(node);
                        case 206 /* ArrayLiteralExpression */:
                            return emitArrayLiteralExpression(node);
                        case 207 /* ObjectLiteralExpression */:
                            return emitObjectLiteralExpression(node);
                        case 208 /* PropertyAccessExpression */:
                            return emitPropertyAccessExpression(node);
                        case 209 /* ElementAccessExpression */:
                            return emitElementAccessExpression(node);
                        case 210 /* CallExpression */:
                            return emitCallExpression(node);
                        case 211 /* NewExpression */:
                            return emitNewExpression(node);
                        case 212 /* TaggedTemplateExpression */:
                            return emitTaggedTemplateExpression(node);
                        case 213 /* TypeAssertionExpression */:
                            return emitTypeAssertionExpression(node);
                        case 214 /* ParenthesizedExpression */:
                            return emitParenthesizedExpression(node);
                        case 215 /* FunctionExpression */:
                            return emitFunctionExpression(node);
                        case 216 /* ArrowFunction */:
                            return emitArrowFunction(node);
                        case 217 /* DeleteExpression */:
                            return emitDeleteExpression(node);
                        case 218 /* TypeOfExpression */:
                            return emitTypeOfExpression(node);
                        case 219 /* VoidExpression */:
                            return emitVoidExpression(node);
                        case 220 /* AwaitExpression */:
                            return emitAwaitExpression(node);
                        case 221 /* PrefixUnaryExpression */:
                            return emitPrefixUnaryExpression(node);
                        case 222 /* PostfixUnaryExpression */:
                            return emitPostfixUnaryExpression(node);
                        case 223 /* BinaryExpression */:
                            return emitBinaryExpression(node);
                        case 224 /* ConditionalExpression */:
                            return emitConditionalExpression(node);
                        case 225 /* TemplateExpression */:
                            return emitTemplateExpression(node);
                        case 226 /* YieldExpression */:
                            return emitYieldExpression(node);
                        case 227 /* SpreadElement */:
                            return emitSpreadElement(node);
                        case 228 /* ClassExpression */:
                            return emitClassExpression(node);
                        case 229 /* OmittedExpression */:
                            return;
                        case 231 /* AsExpression */:
                            return emitAsExpression(node);
                        case 232 /* NonNullExpression */:
                            return emitNonNullExpression(node);
                        case 230 /* ExpressionWithTypeArguments */:
                            return emitExpressionWithTypeArguments(node);
                        case 235 /* SatisfiesExpression */:
                            return emitSatisfiesExpression(node);
                        case 233 /* MetaProperty */:
                            return emitMetaProperty(node);
                        case 234 /* SyntheticExpression */:
                            return Debug.fail("SyntheticExpression should never be printed.");
                        case 279 /* MissingDeclaration */:
                            return;
                        case 281 /* JsxElement */:
                            return emitJsxElement(node);
                        case 282 /* JsxSelfClosingElement */:
                            return emitJsxSelfClosingElement(node);
                        case 285 /* JsxFragment */:
                            return emitJsxFragment(node);
                        case 354 /* SyntaxList */:
                            return Debug.fail("SyntaxList should not be printed");
                        case 355 /* NotEmittedStatement */:
                            return;
                        case 356 /* PartiallyEmittedExpression */:
                            return emitPartiallyEmittedExpression(node);
                        case 357 /* CommaListExpression */:
                            return emitCommaList(node);
                        case 358 /* MergeDeclarationMarker */:
                        case 359 /* EndOfDeclarationMarker */:
                            return;
                        case 360 /* SyntheticReferenceExpression */:
                            return Debug.fail("SyntheticReferenceExpression should not be printed");
                    }
                }
                if (isKeyword(node.kind))
                    return writeTokenNode(node, writeKeyword);
                if (isTokenKind(node.kind))
                    return writeTokenNode(node, writePunctuation);
                Debug.fail(`Unhandled SyntaxKind: ${Debug.formatSyntaxKind(node.kind)}.`);
            }