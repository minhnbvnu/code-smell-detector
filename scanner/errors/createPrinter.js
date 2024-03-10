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
            function emitHelpers(node) {
                let helpersEmitted = false;
                const bundle = node.kind === 309 /* Bundle */ ? node : void 0;
                if (bundle && moduleKind === 0 /* None */) {
                    return;
                }
                const numPrepends = bundle ? bundle.prepends.length : 0;
                const numNodes = bundle ? bundle.sourceFiles.length + numPrepends : 1;
                for (let i = 0; i < numNodes; i++) {
                    const currentNode = bundle ? i < numPrepends ? bundle.prepends[i] : bundle.sourceFiles[i - numPrepends] : node;
                    const sourceFile = isSourceFile(currentNode) ? currentNode : isUnparsedSource(currentNode) ? void 0 : currentSourceFile;
                    const shouldSkip = printerOptions.noEmitHelpers || !!sourceFile && hasRecordedExternalHelpers(sourceFile);
                    const shouldBundle = (isSourceFile(currentNode) || isUnparsedSource(currentNode)) && !isOwnFileEmit;
                    const helpers = isUnparsedSource(currentNode) ? currentNode.helpers : getSortedEmitHelpers(currentNode);
                    if (helpers) {
                        for (const helper of helpers) {
                            if (!helper.scoped) {
                                if (shouldSkip)
                                    continue;
                                if (shouldBundle) {
                                    if (bundledHelpers.get(helper.name)) {
                                        continue;
                                    }
                                    bundledHelpers.set(helper.name, true);
                                }
                            }
                            else if (bundle) {
                                continue;
                            }
                            const pos = getTextPosWithWriteLine();
                            if (typeof helper.text === "string") {
                                writeLines(helper.text);
                            }
                            else {
                                writeLines(helper.text(makeFileLevelOptimisticUniqueName));
                            }
                            if (bundleFileInfo)
                                bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: "emitHelpers" /* EmitHelpers */, data: helper.name });
                            helpersEmitted = true;
                        }
                    }
                }
                return helpersEmitted;
            }
            function emitTripleSlashDirectives(hasNoDefaultLib, files, types, libs2) {
                if (hasNoDefaultLib) {
                    const pos = writer.getTextPos();
                    writeComment(`/// <reference no-default-lib="true"/>`);
                    if (bundleFileInfo)
                        bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: "no-default-lib" /* NoDefaultLib */ });
                    writeLine();
                }
                if (currentSourceFile && currentSourceFile.moduleName) {
                    writeComment(`/// <amd-module name="${currentSourceFile.moduleName}" />`);
                    writeLine();
                }
                if (currentSourceFile && currentSourceFile.amdDependencies) {
                    for (const dep of currentSourceFile.amdDependencies) {
                        if (dep.name) {
                            writeComment(`/// <amd-dependency name="${dep.name}" path="${dep.path}" />`);
                        }
                        else {
                            writeComment(`/// <amd-dependency path="${dep.path}" />`);
                        }
                        writeLine();
                    }
                }
                for (const directive of files) {
                    const pos = writer.getTextPos();
                    writeComment(`/// <reference path="${directive.fileName}" />`);
                    if (bundleFileInfo)
                        bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: "reference" /* Reference */, data: directive.fileName });
                    writeLine();
                }
                for (const directive of types) {
                    const pos = writer.getTextPos();
                    const resolutionMode = directive.resolutionMode && directive.resolutionMode !== (currentSourceFile == null ? void 0 : currentSourceFile.impliedNodeFormat) ? `resolution-mode="${directive.resolutionMode === 99 /* ESNext */ ? "import" : "require"}"` : "";
                    writeComment(`/// <reference types="${directive.fileName}" ${resolutionMode}/>`);
                    if (bundleFileInfo)
                        bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: !directive.resolutionMode ? "type" /* Type */ : directive.resolutionMode === 99 /* ESNext */ ? "type-import" /* TypeResolutionModeImport */ : "type-require" /* TypeResolutionModeRequire */, data: directive.fileName });
                    writeLine();
                }
                for (const directive of libs2) {
                    const pos = writer.getTextPos();
                    writeComment(`/// <reference lib="${directive.fileName}" />`);
                    if (bundleFileInfo)
                        bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: "lib" /* Lib */, data: directive.fileName });
                    writeLine();
                }
            }
            function emitList(parentNode, children, format, parenthesizerRule, start, count) {
            function emitExpressionList(parentNode, children, format, parenthesizerRule, start, count) {
            function emitNodeList(emit2, parentNode, children, format, parenthesizerRule, start = 0, count = children ? children.length - start : 0) {
                const isUndefined = children === void 0;
                if (isUndefined && format & 16384 /* OptionalIfUndefined */) {
                    return;
                }
                const isEmpty = children === void 0 || start >= children.length || count === 0;
                if (isEmpty && format & 32768 /* OptionalIfEmpty */) {
                    onBeforeEmitNodeArray == null ? void 0 : onBeforeEmitNodeArray(children);
                    onAfterEmitNodeArray == null ? void 0 : onAfterEmitNodeArray(children);
                    return;
                }
                if (format & 15360 /* BracketsMask */) {
                    writePunctuation(getOpeningBracket(format));
                    if (isEmpty && children) {
                        emitTrailingCommentsOfPosition(children.pos, 
                        /*prefixSpace*/
                        true);
                    }
                }
                onBeforeEmitNodeArray == null ? void 0 : onBeforeEmitNodeArray(children);
                if (isEmpty) {
                    if (format & 1 /* MultiLine */ && !(preserveSourceNewlines && (!parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile)))) {
                        writeLine();
                    }
                    else if (format & 256 /* SpaceBetweenBraces */ && !(format & 524288 /* NoSpaceIfEmpty */)) {
                        writeSpace();
                    }
                }
                else {
                    emitNodeListItems(emit2, parentNode, children, format, parenthesizerRule, start, count, children.hasTrailingComma, children);
                }
                onAfterEmitNodeArray == null ? void 0 : onAfterEmitNodeArray(children);
                if (format & 15360 /* BracketsMask */) {
                    if (isEmpty && children) {
                        emitLeadingCommentsOfPosition(children.end);
                    }
                    writePunctuation(getClosingBracket(format));
                }
            }
            function emitNodeListItems(emit2, parentNode, children, format, parenthesizerRule, start, count, hasTrailingComma, childrenTextRange) {
                const mayEmitInterveningComments = (format & 262144 /* NoInterveningComments */) === 0;
                let shouldEmitInterveningComments = mayEmitInterveningComments;
                const leadingLineTerminatorCount = getLeadingLineTerminatorCount(parentNode, children[start], format);
                if (leadingLineTerminatorCount) {
                    writeLine(leadingLineTerminatorCount);
                    shouldEmitInterveningComments = false;
                }
                else if (format & 256 /* SpaceBetweenBraces */) {
                    writeSpace();
                }
                if (format & 128 /* Indented */) {
                    increaseIndent();
                }
                const emitListItem = getEmitListItem(emit2, parenthesizerRule);
                let previousSibling;
                let previousSourceFileTextKind;
                let shouldDecreaseIndentAfterEmit = false;
                for (let i = 0; i < count; i++) {
                    const child = children[start + i];
                    if (format & 32 /* AsteriskDelimited */) {
                        writeLine();
                        writeDelimiter(format);
                    }
                    else if (previousSibling) {
                        if (format & 60 /* DelimitersMask */ && previousSibling.end !== (parentNode ? parentNode.end : -1)) {
                            const previousSiblingEmitFlags = getEmitFlags(previousSibling);
                            if (!(previousSiblingEmitFlags & 2048 /* NoTrailingComments */)) {
                                emitLeadingCommentsOfPosition(previousSibling.end);
                            }
                        }
                        writeDelimiter(format);
                        recordBundleFileInternalSectionEnd(previousSourceFileTextKind);
                        const separatingLineTerminatorCount = getSeparatingLineTerminatorCount(previousSibling, child, format);
                        if (separatingLineTerminatorCount > 0) {
                            if ((format & (3 /* LinesMask */ | 128 /* Indented */)) === 0 /* SingleLine */) {
                                increaseIndent();
                                shouldDecreaseIndentAfterEmit = true;
                            }
                            writeLine(separatingLineTerminatorCount);
                            shouldEmitInterveningComments = false;
                        }
                        else if (previousSibling && format & 512 /* SpaceBetweenSiblings */) {
                            writeSpace();
                        }
                    }
                    previousSourceFileTextKind = recordBundleFileInternalSectionStart(child);
                    if (shouldEmitInterveningComments) {
                        const commentRange = getCommentRange(child);
                        emitTrailingCommentsOfPosition(commentRange.pos);
                    }
                    else {
                        shouldEmitInterveningComments = mayEmitInterveningComments;
                    }
                    nextListElementPos = child.pos;
                    emitListItem(child, emit2, parenthesizerRule, i);
                    if (shouldDecreaseIndentAfterEmit) {
                        decreaseIndent();
                        shouldDecreaseIndentAfterEmit = false;
                    }
                    previousSibling = child;
                }
                const emitFlags = previousSibling ? getEmitFlags(previousSibling) : 0;
                const skipTrailingComments = commentsDisabled || !!(emitFlags & 2048 /* NoTrailingComments */);
                const emitTrailingComma = hasTrailingComma && format & 64 /* AllowTrailingComma */ && format & 16 /* CommaDelimited */;
                if (emitTrailingComma) {
                    if (previousSibling && !skipTrailingComments) {
                        emitTokenWithComment(27 /* CommaToken */, previousSibling.end, writePunctuation, previousSibling);
                    }
                    else {
                        writePunctuation(",");
                    }
                }
                if (previousSibling && (parentNode ? parentNode.end : -1) !== previousSibling.end && format & 60 /* DelimitersMask */ && !skipTrailingComments) {
                    emitLeadingCommentsOfPosition(emitTrailingComma && (childrenTextRange == null ? void 0 : childrenTextRange.end) ? childrenTextRange.end : previousSibling.end);
                }
                if (format & 128 /* Indented */) {
                    decreaseIndent();
                }
                recordBundleFileInternalSectionEnd(previousSourceFileTextKind);
                const closingLineTerminatorCount = getClosingLineTerminatorCount(parentNode, children[start + count - 1], format, childrenTextRange);
                if (closingLineTerminatorCount) {
                    writeLine(closingLineTerminatorCount);
                }
                else if (format & (2097152 /* SpaceAfterList */ | 256 /* SpaceBetweenBraces */)) {
                    writeSpace();
                }
            }
            function getClosingLineTerminatorCount(parentNode, lastChild, format, childrenTextRange) {
                if (format & 2 /* PreserveLines */ || preserveSourceNewlines) {
                    if (format & 65536 /* PreferNewLine */) {
                        return 1;
                    }
                    if (lastChild === void 0) {
                        return !parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
                    }
                    if (currentSourceFile && parentNode && !positionIsSynthesized(parentNode.pos) && !nodeIsSynthesized(lastChild) && (!lastChild.parent || lastChild.parent === parentNode)) {
                        if (preserveSourceNewlines) {
                            const end = childrenTextRange && !positionIsSynthesized(childrenTextRange.end) ? childrenTextRange.end : lastChild.end;
                            return getEffectiveLines((includeComments) => getLinesBetweenPositionAndNextNonWhitespaceCharacter(end, parentNode.end, currentSourceFile, includeComments));
                        }
                        return rangeEndPositionsAreOnSameLine(parentNode, lastChild, currentSourceFile) ? 0 : 1;
                    }
                    if (synthesizedNodeStartsOnNewLine(lastChild, format)) {
                        return 1;
                    }
                }
                if (format & 1 /* MultiLine */ && !(format & 131072 /* NoTrailingNewLine */)) {
                    return 1;
                }
                return 0;
            }
            function generateNames(node) {
                if (!node)
                    return;
                switch (node.kind) {
                    case 238 /* Block */:
                        forEach(node.statements, generateNames);
                        break;
                    case 253 /* LabeledStatement */:
                    case 251 /* WithStatement */:
                    case 243 /* DoStatement */:
                    case 244 /* WhileStatement */:
                        generateNames(node.statement);
                        break;
                    case 242 /* IfStatement */:
                        generateNames(node.thenStatement);
                        generateNames(node.elseStatement);
                        break;
                    case 245 /* ForStatement */:
                    case 247 /* ForOfStatement */:
                    case 246 /* ForInStatement */:
                        generateNames(node.initializer);
                        generateNames(node.statement);
                        break;
                    case 252 /* SwitchStatement */:
                        generateNames(node.caseBlock);
                        break;
                    case 266 /* CaseBlock */:
                        forEach(node.clauses, generateNames);
                        break;
                    case 292 /* CaseClause */:
                    case 293 /* DefaultClause */:
                        forEach(node.statements, generateNames);
                        break;
                    case 255 /* TryStatement */:
                        generateNames(node.tryBlock);
                        generateNames(node.catchClause);
                        generateNames(node.finallyBlock);
                        break;
                    case 295 /* CatchClause */:
                        generateNames(node.variableDeclaration);
                        generateNames(node.block);
                        break;
                    case 240 /* VariableStatement */:
                        generateNames(node.declarationList);
                        break;
                    case 258 /* VariableDeclarationList */:
                        forEach(node.declarations, generateNames);
                        break;
                    case 257 /* VariableDeclaration */:
                    case 166 /* Parameter */:
                    case 205 /* BindingElement */:
                    case 260 /* ClassDeclaration */:
                        generateNameIfNeeded(node.name);
                        break;
                    case 259 /* FunctionDeclaration */:
                        generateNameIfNeeded(node.name);
                        if (getEmitFlags(node) & 1048576 /* ReuseTempVariableScope */) {
                            forEach(node.parameters, generateNames);
                            generateNames(node.body);
                        }
                        break;
                    case 203 /* ObjectBindingPattern */:
                    case 204 /* ArrayBindingPattern */:
                        forEach(node.elements, generateNames);
                        break;
                    case 269 /* ImportDeclaration */:
                        generateNames(node.importClause);
                        break;
                    case 270 /* ImportClause */:
                        generateNameIfNeeded(node.name);
                        generateNames(node.namedBindings);
                        break;
                    case 271 /* NamespaceImport */:
                        generateNameIfNeeded(node.name);
                        break;
                    case 277 /* NamespaceExport */:
                        generateNameIfNeeded(node.name);
                        break;
                    case 272 /* NamedImports */:
                        forEach(node.elements, generateNames);
                        break;
                    case 273 /* ImportSpecifier */:
                        generateNameIfNeeded(node.propertyName || node.name);
                        break;
                }
            }
            function makeUniqueName2(baseName, checkFn = isUniqueName, optimistic, scoped, privateName, prefix, suffix) {
            function generateNameForNode(node, privateName, flags, prefix, suffix) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                    case 80 /* PrivateIdentifier */:
                        return makeUniqueName2(getTextOfNode2(node), isUniqueName, !!(flags & 16 /* Optimistic */), !!(flags & 8 /* ReservedInNestedScopes */), privateName, prefix, suffix);
                    case 264 /* ModuleDeclaration */:
                    case 263 /* EnumDeclaration */:
                        Debug.assert(!prefix && !suffix && !privateName);
                        return generateNameForModuleOrEnum(node);
                    case 269 /* ImportDeclaration */:
                    case 275 /* ExportDeclaration */:
                        Debug.assert(!prefix && !suffix && !privateName);
                        return generateNameForImportOrExportDeclaration(node);
                    case 259 /* FunctionDeclaration */:
                    case 260 /* ClassDeclaration */: {
                        Debug.assert(!prefix && !suffix && !privateName);
                        const name = node.name;
                        if (name && !isGeneratedIdentifier(name)) {
                            return generateNameForNode(name, 
                            /*privateName*/
                            false, flags, prefix, suffix);
                        }
                        return generateNameForExportDefault();
                    }
                    case 274 /* ExportAssignment */:
                        Debug.assert(!prefix && !suffix && !privateName);
                        return generateNameForExportDefault();
                    case 228 /* ClassExpression */:
                        Debug.assert(!prefix && !suffix && !privateName);
                        return generateNameForClassExpression();
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return generateNameForMethodOrAccessor(node, privateName, prefix, suffix);
                    case 164 /* ComputedPropertyName */:
                        return makeTempVariableName(0 /* Auto */, 
                        /*reserveInNestedScopes*/
                        true, privateName, prefix, suffix);
                    default:
                        return makeTempVariableName(0 /* Auto */, 
                        /*reserveInNestedScopes*/
                        false, privateName, prefix, suffix);
                }
            }
            function emitTrailingCommentsOfNode(node, emitFlags, pos, end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd) {
            function emitComment(text, lineMap, writer2, commentPos, commentEnd, newLine2) {