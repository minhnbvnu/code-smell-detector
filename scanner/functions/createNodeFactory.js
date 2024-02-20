function createNodeFactory(flags, baseFactory2) {
            const update = flags & 8 /* NoOriginalNode */ ? updateWithoutOriginal : updateWithOriginal;
            const parenthesizerRules = memoize(() => flags & 1 /* NoParenthesizerRules */ ? nullParenthesizerRules : createParenthesizerRules(factory2));
            const converters = memoize(() => flags & 2 /* NoNodeConverters */ ? nullNodeConverters : createNodeConverters(factory2));
            const getBinaryCreateFunction = memoizeOne((operator) => (left, right) => createBinaryExpression(left, operator, right));
            const getPrefixUnaryCreateFunction = memoizeOne((operator) => (operand) => createPrefixUnaryExpression(operator, operand));
            const getPostfixUnaryCreateFunction = memoizeOne((operator) => (operand) => createPostfixUnaryExpression(operand, operator));
            const getJSDocPrimaryTypeCreateFunction = memoizeOne((kind) => () => createJSDocPrimaryTypeWorker(kind));
            const getJSDocUnaryTypeCreateFunction = memoizeOne((kind) => (type) => createJSDocUnaryTypeWorker(kind, type));
            const getJSDocUnaryTypeUpdateFunction = memoizeOne((kind) => (node, type) => updateJSDocUnaryTypeWorker(kind, node, type));
            const getJSDocPrePostfixUnaryTypeCreateFunction = memoizeOne((kind) => (type, postfix) => createJSDocPrePostfixUnaryTypeWorker(kind, type, postfix));
            const getJSDocPrePostfixUnaryTypeUpdateFunction = memoizeOne((kind) => (node, type) => updateJSDocPrePostfixUnaryTypeWorker(kind, node, type));
            const getJSDocSimpleTagCreateFunction = memoizeOne((kind) => (tagName, comment) => createJSDocSimpleTagWorker(kind, tagName, comment));
            const getJSDocSimpleTagUpdateFunction = memoizeOne((kind) => (node, tagName, comment) => updateJSDocSimpleTagWorker(kind, node, tagName, comment));
            const getJSDocTypeLikeTagCreateFunction = memoizeOne((kind) => (tagName, typeExpression, comment) => createJSDocTypeLikeTagWorker(kind, tagName, typeExpression, comment));
            const getJSDocTypeLikeTagUpdateFunction = memoizeOne((kind) => (node, tagName, typeExpression, comment) => updateJSDocTypeLikeTagWorker(kind, node, tagName, typeExpression, comment));
            const factory2 = {
                get parenthesizer() {
                    return parenthesizerRules();
                },
                get converters() {
                    return converters();
                },
                baseFactory: baseFactory2,
                flags,
                createNodeArray,
                createNumericLiteral,
                createBigIntLiteral,
                createStringLiteral,
                createStringLiteralFromNode,
                createRegularExpressionLiteral,
                createLiteralLikeNode,
                createIdentifier,
                createTempVariable,
                createLoopVariable,
                createUniqueName,
                getGeneratedNameForNode,
                createPrivateIdentifier,
                createUniquePrivateName,
                getGeneratedPrivateNameForNode,
                createToken,
                createSuper,
                createThis,
                createNull,
                createTrue,
                createFalse,
                createModifier,
                createModifiersFromModifierFlags,
                createQualifiedName,
                updateQualifiedName,
                createComputedPropertyName,
                updateComputedPropertyName,
                createTypeParameterDeclaration,
                updateTypeParameterDeclaration,
                createParameterDeclaration,
                updateParameterDeclaration,
                createDecorator,
                updateDecorator,
                createPropertySignature,
                updatePropertySignature,
                createPropertyDeclaration,
                updatePropertyDeclaration: updatePropertyDeclaration2,
                createMethodSignature,
                updateMethodSignature,
                createMethodDeclaration,
                updateMethodDeclaration,
                createConstructorDeclaration,
                updateConstructorDeclaration,
                createGetAccessorDeclaration,
                updateGetAccessorDeclaration,
                createSetAccessorDeclaration,
                updateSetAccessorDeclaration,
                createCallSignature,
                updateCallSignature,
                createConstructSignature,
                updateConstructSignature,
                createIndexSignature,
                updateIndexSignature,
                createClassStaticBlockDeclaration,
                updateClassStaticBlockDeclaration,
                createTemplateLiteralTypeSpan,
                updateTemplateLiteralTypeSpan,
                createKeywordTypeNode,
                createTypePredicateNode,
                updateTypePredicateNode,
                createTypeReferenceNode,
                updateTypeReferenceNode,
                createFunctionTypeNode,
                updateFunctionTypeNode,
                createConstructorTypeNode,
                updateConstructorTypeNode,
                createTypeQueryNode,
                updateTypeQueryNode,
                createTypeLiteralNode,
                updateTypeLiteralNode,
                createArrayTypeNode,
                updateArrayTypeNode,
                createTupleTypeNode,
                updateTupleTypeNode,
                createNamedTupleMember,
                updateNamedTupleMember,
                createOptionalTypeNode,
                updateOptionalTypeNode,
                createRestTypeNode,
                updateRestTypeNode,
                createUnionTypeNode,
                updateUnionTypeNode,
                createIntersectionTypeNode,
                updateIntersectionTypeNode,
                createConditionalTypeNode,
                updateConditionalTypeNode,
                createInferTypeNode,
                updateInferTypeNode,
                createImportTypeNode,
                updateImportTypeNode,
                createParenthesizedType,
                updateParenthesizedType,
                createThisTypeNode,
                createTypeOperatorNode,
                updateTypeOperatorNode,
                createIndexedAccessTypeNode,
                updateIndexedAccessTypeNode,
                createMappedTypeNode,
                updateMappedTypeNode,
                createLiteralTypeNode,
                updateLiteralTypeNode,
                createTemplateLiteralType,
                updateTemplateLiteralType,
                createObjectBindingPattern,
                updateObjectBindingPattern,
                createArrayBindingPattern,
                updateArrayBindingPattern,
                createBindingElement,
                updateBindingElement,
                createArrayLiteralExpression,
                updateArrayLiteralExpression,
                createObjectLiteralExpression,
                updateObjectLiteralExpression,
                createPropertyAccessExpression: flags & 4 /* NoIndentationOnFreshPropertyAccess */ ? (expression, name) => setEmitFlags(createPropertyAccessExpression(expression, name), 262144 /* NoIndentation */) : createPropertyAccessExpression,
                updatePropertyAccessExpression,
                createPropertyAccessChain: flags & 4 /* NoIndentationOnFreshPropertyAccess */ ? (expression, questionDotToken, name) => setEmitFlags(createPropertyAccessChain(expression, questionDotToken, name), 262144 /* NoIndentation */) : createPropertyAccessChain,
                updatePropertyAccessChain,
                createElementAccessExpression,
                updateElementAccessExpression,
                createElementAccessChain,
                updateElementAccessChain,
                createCallExpression,
                updateCallExpression,
                createCallChain,
                updateCallChain,
                createNewExpression,
                updateNewExpression,
                createTaggedTemplateExpression,
                updateTaggedTemplateExpression,
                createTypeAssertion,
                updateTypeAssertion,
                createParenthesizedExpression,
                updateParenthesizedExpression,
                createFunctionExpression,
                updateFunctionExpression,
                createArrowFunction,
                updateArrowFunction,
                createDeleteExpression,
                updateDeleteExpression,
                createTypeOfExpression,
                updateTypeOfExpression,
                createVoidExpression,
                updateVoidExpression,
                createAwaitExpression,
                updateAwaitExpression,
                createPrefixUnaryExpression,
                updatePrefixUnaryExpression,
                createPostfixUnaryExpression,
                updatePostfixUnaryExpression,
                createBinaryExpression,
                updateBinaryExpression,
                createConditionalExpression,
                updateConditionalExpression,
                createTemplateExpression,
                updateTemplateExpression,
                createTemplateHead,
                createTemplateMiddle,
                createTemplateTail,
                createNoSubstitutionTemplateLiteral,
                createTemplateLiteralLikeNode,
                createYieldExpression,
                updateYieldExpression,
                createSpreadElement,
                updateSpreadElement,
                createClassExpression,
                updateClassExpression,
                createOmittedExpression,
                createExpressionWithTypeArguments,
                updateExpressionWithTypeArguments,
                createAsExpression,
                updateAsExpression,
                createNonNullExpression,
                updateNonNullExpression,
                createSatisfiesExpression,
                updateSatisfiesExpression,
                createNonNullChain,
                updateNonNullChain,
                createMetaProperty,
                updateMetaProperty,
                createTemplateSpan,
                updateTemplateSpan,
                createSemicolonClassElement,
                createBlock,
                updateBlock,
                createVariableStatement,
                updateVariableStatement,
                createEmptyStatement,
                createExpressionStatement,
                updateExpressionStatement,
                createIfStatement,
                updateIfStatement,
                createDoStatement,
                updateDoStatement,
                createWhileStatement,
                updateWhileStatement,
                createForStatement,
                updateForStatement,
                createForInStatement,
                updateForInStatement,
                createForOfStatement,
                updateForOfStatement,
                createContinueStatement,
                updateContinueStatement,
                createBreakStatement,
                updateBreakStatement,
                createReturnStatement,
                updateReturnStatement,
                createWithStatement,
                updateWithStatement,
                createSwitchStatement,
                updateSwitchStatement,
                createLabeledStatement,
                updateLabeledStatement,
                createThrowStatement,
                updateThrowStatement,
                createTryStatement,
                updateTryStatement,
                createDebuggerStatement,
                createVariableDeclaration,
                updateVariableDeclaration,
                createVariableDeclarationList,
                updateVariableDeclarationList,
                createFunctionDeclaration,
                updateFunctionDeclaration,
                createClassDeclaration,
                updateClassDeclaration,
                createInterfaceDeclaration,
                updateInterfaceDeclaration,
                createTypeAliasDeclaration,
                updateTypeAliasDeclaration,
                createEnumDeclaration,
                updateEnumDeclaration,
                createModuleDeclaration,
                updateModuleDeclaration,
                createModuleBlock,
                updateModuleBlock,
                createCaseBlock,
                updateCaseBlock,
                createNamespaceExportDeclaration,
                updateNamespaceExportDeclaration,
                createImportEqualsDeclaration,
                updateImportEqualsDeclaration,
                createImportDeclaration,
                updateImportDeclaration,
                createImportClause,
                updateImportClause,
                createAssertClause,
                updateAssertClause,
                createAssertEntry,
                updateAssertEntry,
                createImportTypeAssertionContainer,
                updateImportTypeAssertionContainer,
                createNamespaceImport,
                updateNamespaceImport,
                createNamespaceExport,
                updateNamespaceExport,
                createNamedImports,
                updateNamedImports,
                createImportSpecifier,
                updateImportSpecifier,
                createExportAssignment: createExportAssignment2,
                updateExportAssignment,
                createExportDeclaration,
                updateExportDeclaration,
                createNamedExports,
                updateNamedExports,
                createExportSpecifier,
                updateExportSpecifier,
                createMissingDeclaration,
                createExternalModuleReference,
                updateExternalModuleReference,
                // lazily load factory members for JSDoc types with similar structure
                get createJSDocAllType() {
                    return getJSDocPrimaryTypeCreateFunction(315 /* JSDocAllType */);
                },
                get createJSDocUnknownType() {
                    return getJSDocPrimaryTypeCreateFunction(316 /* JSDocUnknownType */);
                },
                get createJSDocNonNullableType() {
                    return getJSDocPrePostfixUnaryTypeCreateFunction(318 /* JSDocNonNullableType */);
                },
                get updateJSDocNonNullableType() {
                    return getJSDocPrePostfixUnaryTypeUpdateFunction(318 /* JSDocNonNullableType */);
                },
                get createJSDocNullableType() {
                    return getJSDocPrePostfixUnaryTypeCreateFunction(317 /* JSDocNullableType */);
                },
                get updateJSDocNullableType() {
                    return getJSDocPrePostfixUnaryTypeUpdateFunction(317 /* JSDocNullableType */);
                },
                get createJSDocOptionalType() {
                    return getJSDocUnaryTypeCreateFunction(319 /* JSDocOptionalType */);
                },
                get updateJSDocOptionalType() {
                    return getJSDocUnaryTypeUpdateFunction(319 /* JSDocOptionalType */);
                },
                get createJSDocVariadicType() {
                    return getJSDocUnaryTypeCreateFunction(321 /* JSDocVariadicType */);
                },
                get updateJSDocVariadicType() {
                    return getJSDocUnaryTypeUpdateFunction(321 /* JSDocVariadicType */);
                },
                get createJSDocNamepathType() {
                    return getJSDocUnaryTypeCreateFunction(322 /* JSDocNamepathType */);
                },
                get updateJSDocNamepathType() {
                    return getJSDocUnaryTypeUpdateFunction(322 /* JSDocNamepathType */);
                },
                createJSDocFunctionType,
                updateJSDocFunctionType,
                createJSDocTypeLiteral,
                updateJSDocTypeLiteral,
                createJSDocTypeExpression,
                updateJSDocTypeExpression,
                createJSDocSignature,
                updateJSDocSignature,
                createJSDocTemplateTag,
                updateJSDocTemplateTag,
                createJSDocTypedefTag,
                updateJSDocTypedefTag,
                createJSDocParameterTag,
                updateJSDocParameterTag,
                createJSDocPropertyTag,
                updateJSDocPropertyTag,
                createJSDocCallbackTag,
                updateJSDocCallbackTag,
                createJSDocOverloadTag,
                updateJSDocOverloadTag,
                createJSDocAugmentsTag,
                updateJSDocAugmentsTag,
                createJSDocImplementsTag,
                updateJSDocImplementsTag,
                createJSDocSeeTag,
                updateJSDocSeeTag,
                createJSDocNameReference,
                updateJSDocNameReference,
                createJSDocMemberName,
                updateJSDocMemberName,
                createJSDocLink,
                updateJSDocLink,
                createJSDocLinkCode,
                updateJSDocLinkCode,
                createJSDocLinkPlain,
                updateJSDocLinkPlain,
                // lazily load factory members for JSDoc tags with similar structure
                get createJSDocTypeTag() {
                    return getJSDocTypeLikeTagCreateFunction(347 /* JSDocTypeTag */);
                },
                get updateJSDocTypeTag() {
                    return getJSDocTypeLikeTagUpdateFunction(347 /* JSDocTypeTag */);
                },
                get createJSDocReturnTag() {
                    return getJSDocTypeLikeTagCreateFunction(345 /* JSDocReturnTag */);
                },
                get updateJSDocReturnTag() {
                    return getJSDocTypeLikeTagUpdateFunction(345 /* JSDocReturnTag */);
                },
                get createJSDocThisTag() {
                    return getJSDocTypeLikeTagCreateFunction(346 /* JSDocThisTag */);
                },
                get updateJSDocThisTag() {
                    return getJSDocTypeLikeTagUpdateFunction(346 /* JSDocThisTag */);
                },
                get createJSDocAuthorTag() {
                    return getJSDocSimpleTagCreateFunction(333 /* JSDocAuthorTag */);
                },
                get updateJSDocAuthorTag() {
                    return getJSDocSimpleTagUpdateFunction(333 /* JSDocAuthorTag */);
                },
                get createJSDocClassTag() {
                    return getJSDocSimpleTagCreateFunction(335 /* JSDocClassTag */);
                },
                get updateJSDocClassTag() {
                    return getJSDocSimpleTagUpdateFunction(335 /* JSDocClassTag */);
                },
                get createJSDocPublicTag() {
                    return getJSDocSimpleTagCreateFunction(336 /* JSDocPublicTag */);
                },
                get updateJSDocPublicTag() {
                    return getJSDocSimpleTagUpdateFunction(336 /* JSDocPublicTag */);
                },
                get createJSDocPrivateTag() {
                    return getJSDocSimpleTagCreateFunction(337 /* JSDocPrivateTag */);
                },
                get updateJSDocPrivateTag() {
                    return getJSDocSimpleTagUpdateFunction(337 /* JSDocPrivateTag */);
                },
                get createJSDocProtectedTag() {
                    return getJSDocSimpleTagCreateFunction(338 /* JSDocProtectedTag */);
                },
                get updateJSDocProtectedTag() {
                    return getJSDocSimpleTagUpdateFunction(338 /* JSDocProtectedTag */);
                },
                get createJSDocReadonlyTag() {
                    return getJSDocSimpleTagCreateFunction(339 /* JSDocReadonlyTag */);
                },
                get updateJSDocReadonlyTag() {
                    return getJSDocSimpleTagUpdateFunction(339 /* JSDocReadonlyTag */);
                },
                get createJSDocOverrideTag() {
                    return getJSDocSimpleTagCreateFunction(340 /* JSDocOverrideTag */);
                },
                get updateJSDocOverrideTag() {
                    return getJSDocSimpleTagUpdateFunction(340 /* JSDocOverrideTag */);
                },
                get createJSDocDeprecatedTag() {
                    return getJSDocSimpleTagCreateFunction(334 /* JSDocDeprecatedTag */);
                },
                get updateJSDocDeprecatedTag() {
                    return getJSDocSimpleTagUpdateFunction(334 /* JSDocDeprecatedTag */);
                },
                get createJSDocThrowsTag() {
                    return getJSDocTypeLikeTagCreateFunction(352 /* JSDocThrowsTag */);
                },
                get updateJSDocThrowsTag() {
                    return getJSDocTypeLikeTagUpdateFunction(352 /* JSDocThrowsTag */);
                },
                get createJSDocSatisfiesTag() {
                    return getJSDocTypeLikeTagCreateFunction(353 /* JSDocSatisfiesTag */);
                },
                get updateJSDocSatisfiesTag() {
                    return getJSDocTypeLikeTagUpdateFunction(353 /* JSDocSatisfiesTag */);
                },
                createJSDocEnumTag,
                updateJSDocEnumTag,
                createJSDocUnknownTag,
                updateJSDocUnknownTag,
                createJSDocText,
                updateJSDocText,
                createJSDocComment,
                updateJSDocComment,
                createJsxElement,
                updateJsxElement,
                createJsxSelfClosingElement,
                updateJsxSelfClosingElement,
                createJsxOpeningElement,
                updateJsxOpeningElement,
                createJsxClosingElement,
                updateJsxClosingElement,
                createJsxFragment,
                createJsxText,
                updateJsxText,
                createJsxOpeningFragment,
                createJsxJsxClosingFragment,
                updateJsxFragment,
                createJsxAttribute,
                updateJsxAttribute,
                createJsxAttributes,
                updateJsxAttributes,
                createJsxSpreadAttribute,
                updateJsxSpreadAttribute,
                createJsxExpression,
                updateJsxExpression,
                createCaseClause,
                updateCaseClause,
                createDefaultClause,
                updateDefaultClause,
                createHeritageClause,
                updateHeritageClause,
                createCatchClause,
                updateCatchClause,
                createPropertyAssignment,
                updatePropertyAssignment,
                createShorthandPropertyAssignment,
                updateShorthandPropertyAssignment,
                createSpreadAssignment,
                updateSpreadAssignment,
                createEnumMember,
                updateEnumMember,
                createSourceFile: createSourceFile2,
                updateSourceFile: updateSourceFile2,
                createRedirectedSourceFile,
                createBundle,
                updateBundle,
                createUnparsedSource,
                createUnparsedPrologue,
                createUnparsedPrepend,
                createUnparsedTextLike,
                createUnparsedSyntheticReference,
                createInputFiles: createInputFiles2,
                createSyntheticExpression,
                createSyntaxList: createSyntaxList3,
                createNotEmittedStatement,
                createPartiallyEmittedExpression,
                updatePartiallyEmittedExpression,
                createCommaListExpression,
                updateCommaListExpression,
                createEndOfDeclarationMarker,
                createMergeDeclarationMarker,
                createSyntheticReferenceExpression,
                updateSyntheticReferenceExpression,
                cloneNode,
                // Lazily load factory methods for common operator factories and utilities
                get createComma() {
                    return getBinaryCreateFunction(27 /* CommaToken */);
                },
                get createAssignment() {
                    return getBinaryCreateFunction(63 /* EqualsToken */);
                },
                get createLogicalOr() {
                    return getBinaryCreateFunction(56 /* BarBarToken */);
                },
                get createLogicalAnd() {
                    return getBinaryCreateFunction(55 /* AmpersandAmpersandToken */);
                },
                get createBitwiseOr() {
                    return getBinaryCreateFunction(51 /* BarToken */);
                },
                get createBitwiseXor() {
                    return getBinaryCreateFunction(52 /* CaretToken */);
                },
                get createBitwiseAnd() {
                    return getBinaryCreateFunction(50 /* AmpersandToken */);
                },
                get createStrictEquality() {
                    return getBinaryCreateFunction(36 /* EqualsEqualsEqualsToken */);
                },
                get createStrictInequality() {
                    return getBinaryCreateFunction(37 /* ExclamationEqualsEqualsToken */);
                },
                get createEquality() {
                    return getBinaryCreateFunction(34 /* EqualsEqualsToken */);
                },
                get createInequality() {
                    return getBinaryCreateFunction(35 /* ExclamationEqualsToken */);
                },
                get createLessThan() {
                    return getBinaryCreateFunction(29 /* LessThanToken */);
                },
                get createLessThanEquals() {
                    return getBinaryCreateFunction(32 /* LessThanEqualsToken */);
                },
                get createGreaterThan() {
                    return getBinaryCreateFunction(31 /* GreaterThanToken */);
                },
                get createGreaterThanEquals() {
                    return getBinaryCreateFunction(33 /* GreaterThanEqualsToken */);
                },
                get createLeftShift() {
                    return getBinaryCreateFunction(47 /* LessThanLessThanToken */);
                },
                get createRightShift() {
                    return getBinaryCreateFunction(48 /* GreaterThanGreaterThanToken */);
                },
                get createUnsignedRightShift() {
                    return getBinaryCreateFunction(49 /* GreaterThanGreaterThanGreaterThanToken */);
                },
                get createAdd() {
                    return getBinaryCreateFunction(39 /* PlusToken */);
                },
                get createSubtract() {
                    return getBinaryCreateFunction(40 /* MinusToken */);
                },
                get createMultiply() {
                    return getBinaryCreateFunction(41 /* AsteriskToken */);
                },
                get createDivide() {
                    return getBinaryCreateFunction(43 /* SlashToken */);
                },
                get createModulo() {
                    return getBinaryCreateFunction(44 /* PercentToken */);
                },
                get createExponent() {
                    return getBinaryCreateFunction(42 /* AsteriskAsteriskToken */);
                },
                get createPrefixPlus() {
                    return getPrefixUnaryCreateFunction(39 /* PlusToken */);
                },
                get createPrefixMinus() {
                    return getPrefixUnaryCreateFunction(40 /* MinusToken */);
                },
                get createPrefixIncrement() {
                    return getPrefixUnaryCreateFunction(45 /* PlusPlusToken */);
                },
                get createPrefixDecrement() {
                    return getPrefixUnaryCreateFunction(46 /* MinusMinusToken */);
                },
                get createBitwiseNot() {
                    return getPrefixUnaryCreateFunction(54 /* TildeToken */);
                },
                get createLogicalNot() {
                    return getPrefixUnaryCreateFunction(53 /* ExclamationToken */);
                },
                get createPostfixIncrement() {
                    return getPostfixUnaryCreateFunction(45 /* PlusPlusToken */);
                },
                get createPostfixDecrement() {
                    return getPostfixUnaryCreateFunction(46 /* MinusMinusToken */);
                },
                // Compound nodes
                createImmediatelyInvokedFunctionExpression,
                createImmediatelyInvokedArrowFunction,
                createVoidZero,
                createExportDefault,
                createExternalModuleExport,
                createTypeCheck,
                createMethodCall,
                createGlobalMethodCall,
                createFunctionBindCall,
                createFunctionCallCall,
                createFunctionApplyCall,
                createArraySliceCall,
                createArrayConcatCall,
                createObjectDefinePropertyCall,
                createObjectGetOwnPropertyDescriptorCall,
                createReflectGetCall,
                createReflectSetCall,
                createPropertyDescriptor,
                createCallBinding,
                createAssignmentTargetWrapper,
                // Utilities
                inlineExpressions,
                getInternalName,
                getLocalName,
                getExportName,
                getDeclarationName,
                getNamespaceMemberName,
                getExternalModuleOrNamespaceExportName,
                restoreOuterExpressions,
                restoreEnclosingLabel,
                createUseStrictPrologue,
                copyPrologue,
                copyStandardPrologue,
                copyCustomPrologue,
                ensureUseStrict,
                liftToBlock,
                mergeLexicalEnvironment,
                updateModifiers
            };
            forEach(nodeFactoryPatchers, (fn) => fn(factory2));
            return factory2;
            function createNodeArray(elements, hasTrailingComma) {
                if (elements === void 0 || elements === emptyArray) {
                    elements = [];
                }
                else if (isNodeArray(elements)) {
                    if (hasTrailingComma === void 0 || elements.hasTrailingComma === hasTrailingComma) {
                        if (elements.transformFlags === void 0) {
                            aggregateChildrenFlags(elements);
                        }
                        Debug.attachNodeArrayDebugInfo(elements);
                        return elements;
                    }
                    const array2 = elements.slice();
                    array2.pos = elements.pos;
                    array2.end = elements.end;
                    array2.hasTrailingComma = hasTrailingComma;
                    array2.transformFlags = elements.transformFlags;
                    Debug.attachNodeArrayDebugInfo(array2);
                    return array2;
                }
                const length2 = elements.length;
                const array = length2 >= 1 && length2 <= 4 ? elements.slice() : elements;
                array.pos = -1;
                array.end = -1;
                array.hasTrailingComma = !!hasTrailingComma;
                array.transformFlags = 0 /* None */;
                aggregateChildrenFlags(array);
                Debug.attachNodeArrayDebugInfo(array);
                return array;
            }
            function createBaseNode(kind) {
                return baseFactory2.createBaseNode(kind);
            }
            function createBaseDeclaration(kind) {
                const node = createBaseNode(kind);
                node.symbol = void 0;
                node.localSymbol = void 0;
                return node;
            }
            function finishUpdateBaseSignatureDeclaration(updated, original) {
                if (updated !== original) {
                    updated.typeArguments = original.typeArguments;
                }
                return update(updated, original);
            }
            function createNumericLiteral(value, numericLiteralFlags = 0 /* None */) {
                const node = createBaseDeclaration(8 /* NumericLiteral */);
                node.text = typeof value === "number" ? value + "" : value;
                node.numericLiteralFlags = numericLiteralFlags;
                if (numericLiteralFlags & 384 /* BinaryOrOctalSpecifier */)
                    node.transformFlags |= 1024 /* ContainsES2015 */;
                return node;
            }
            function createBigIntLiteral(value) {
                const node = createBaseToken(9 /* BigIntLiteral */);
                node.text = typeof value === "string" ? value : pseudoBigIntToString(value) + "n";
                node.transformFlags |= 4 /* ContainsESNext */;
                return node;
            }
            function createBaseStringLiteral(text, isSingleQuote) {
                const node = createBaseDeclaration(10 /* StringLiteral */);
                node.text = text;
                node.singleQuote = isSingleQuote;
                return node;
            }
            function createStringLiteral(text, isSingleQuote, hasExtendedUnicodeEscape) {
                const node = createBaseStringLiteral(text, isSingleQuote);
                node.hasExtendedUnicodeEscape = hasExtendedUnicodeEscape;
                if (hasExtendedUnicodeEscape)
                    node.transformFlags |= 1024 /* ContainsES2015 */;
                return node;
            }
            function createStringLiteralFromNode(sourceNode) {
                const node = createBaseStringLiteral(getTextOfIdentifierOrLiteral(sourceNode), 
                /*isSingleQuote*/
                void 0);
                node.textSourceNode = sourceNode;
                return node;
            }
            function createRegularExpressionLiteral(text) {
                const node = createBaseToken(13 /* RegularExpressionLiteral */);
                node.text = text;
                return node;
            }
            function createLiteralLikeNode(kind, text) {
                switch (kind) {
                    case 8 /* NumericLiteral */:
                        return createNumericLiteral(text, 
                        /*numericLiteralFlags*/
                        0);
                    case 9 /* BigIntLiteral */:
                        return createBigIntLiteral(text);
                    case 10 /* StringLiteral */:
                        return createStringLiteral(text, 
                        /*isSingleQuote*/
                        void 0);
                    case 11 /* JsxText */:
                        return createJsxText(text, 
                        /*containsOnlyTriviaWhiteSpaces*/
                        false);
                    case 12 /* JsxTextAllWhiteSpaces */:
                        return createJsxText(text, 
                        /*containsOnlyTriviaWhiteSpaces*/
                        true);
                    case 13 /* RegularExpressionLiteral */:
                        return createRegularExpressionLiteral(text);
                    case 14 /* NoSubstitutionTemplateLiteral */:
                        return createTemplateLiteralLikeNode(kind, text, 
                        /*rawText*/
                        void 0, 
                        /*templateFlags*/
                        0);
                }
            }
            function createBaseIdentifier(escapedText) {
                const node = baseFactory2.createBaseIdentifierNode(79 /* Identifier */);
                node.escapedText = escapedText;
                node.jsDoc = void 0;
                node.flowNode = void 0;
                node.symbol = void 0;
                return node;
            }
            function createBaseGeneratedIdentifier(text, autoGenerateFlags, prefix, suffix) {
                const node = createBaseIdentifier(escapeLeadingUnderscores(text));
                setIdentifierAutoGenerate(node, {
                    flags: autoGenerateFlags,
                    id: nextAutoGenerateId,
                    prefix,
                    suffix
                });
                nextAutoGenerateId++;
                return node;
            }
            function createIdentifier(text, originalKeywordKind, hasExtendedUnicodeEscape) {
                if (originalKeywordKind === void 0 && text) {
                    originalKeywordKind = stringToToken(text);
                }
                if (originalKeywordKind === 79 /* Identifier */) {
                    originalKeywordKind = void 0;
                }
                const node = createBaseIdentifier(escapeLeadingUnderscores(text));
                if (hasExtendedUnicodeEscape)
                    node.flags |= 128 /* IdentifierHasExtendedUnicodeEscape */;
                if (node.escapedText === "await") {
                    node.transformFlags |= 67108864 /* ContainsPossibleTopLevelAwait */;
                }
                if (node.flags & 128 /* IdentifierHasExtendedUnicodeEscape */) {
                    node.transformFlags |= 1024 /* ContainsES2015 */;
                }
                return node;
            }
            function createTempVariable(recordTempVariable, reservedInNestedScopes, prefix, suffix) {
                let flags2 = 1 /* Auto */;
                if (reservedInNestedScopes)
                    flags2 |= 8 /* ReservedInNestedScopes */;
                const name = createBaseGeneratedIdentifier("", flags2, prefix, suffix);
                if (recordTempVariable) {
                    recordTempVariable(name);
                }
                return name;
            }
            function createLoopVariable(reservedInNestedScopes) {
                let flags2 = 2 /* Loop */;
                if (reservedInNestedScopes)
                    flags2 |= 8 /* ReservedInNestedScopes */;
                return createBaseGeneratedIdentifier("", flags2, 
                /*prefix*/
                void 0, 
                /*suffix*/
                void 0);
            }
            function createUniqueName(text, flags2 = 0 /* None */, prefix, suffix) {
                Debug.assert(!(flags2 & 7 /* KindMask */), "Argument out of range: flags");
                Debug.assert((flags2 & (16 /* Optimistic */ | 32 /* FileLevel */)) !== 32 /* FileLevel */, "GeneratedIdentifierFlags.FileLevel cannot be set without also setting GeneratedIdentifierFlags.Optimistic");
                return createBaseGeneratedIdentifier(text, 3 /* Unique */ | flags2, prefix, suffix);
            }
            function getGeneratedNameForNode(node, flags2 = 0, prefix, suffix) {
                Debug.assert(!(flags2 & 7 /* KindMask */), "Argument out of range: flags");
                const text = !node ? "" : isMemberName(node) ? formatGeneratedName(
                /*privateName*/
                false, prefix, node, suffix, idText) : `generated@${getNodeId(node)}`;
                if (prefix || suffix)
                    flags2 |= 16 /* Optimistic */;
                const name = createBaseGeneratedIdentifier(text, 4 /* Node */ | flags2, prefix, suffix);
                name.original = node;
                return name;
            }
            function createBasePrivateIdentifier(escapedText) {
                const node = baseFactory2.createBasePrivateIdentifierNode(80 /* PrivateIdentifier */);
                node.escapedText = escapedText;
                node.transformFlags |= 16777216 /* ContainsClassFields */;
                return node;
            }
            function createPrivateIdentifier(text) {
                if (!startsWith(text, "#"))
                    Debug.fail("First character of private identifier must be #: " + text);
                return createBasePrivateIdentifier(escapeLeadingUnderscores(text));
            }
            function createBaseGeneratedPrivateIdentifier(text, autoGenerateFlags, prefix, suffix) {
                const node = createBasePrivateIdentifier(escapeLeadingUnderscores(text));
                setIdentifierAutoGenerate(node, {
                    flags: autoGenerateFlags,
                    id: nextAutoGenerateId,
                    prefix,
                    suffix
                });
                nextAutoGenerateId++;
                return node;
            }
            function createUniquePrivateName(text, prefix, suffix) {
                if (text && !startsWith(text, "#"))
                    Debug.fail("First character of private identifier must be #: " + text);
                const autoGenerateFlags = 8 /* ReservedInNestedScopes */ | (text ? 3 /* Unique */ : 1 /* Auto */);
                return createBaseGeneratedPrivateIdentifier(text != null ? text : "", autoGenerateFlags, prefix, suffix);
            }
            function getGeneratedPrivateNameForNode(node, prefix, suffix) {
                const text = isMemberName(node) ? formatGeneratedName(
                /*privateName*/
                true, prefix, node, suffix, idText) : `#generated@${getNodeId(node)}`;
                const flags2 = prefix || suffix ? 16 /* Optimistic */ : 0 /* None */;
                const name = createBaseGeneratedPrivateIdentifier(text, 4 /* Node */ | flags2, prefix, suffix);
                name.original = node;
                return name;
            }
            function createBaseToken(kind) {
                return baseFactory2.createBaseTokenNode(kind);
            }
            function createToken(token) {
                Debug.assert(token >= 0 /* FirstToken */ && token <= 162 /* LastToken */, "Invalid token");
                Debug.assert(token <= 14 /* FirstTemplateToken */ || token >= 17 /* LastTemplateToken */, "Invalid token. Use 'createTemplateLiteralLikeNode' to create template literals.");
                Debug.assert(token <= 8 /* FirstLiteralToken */ || token >= 14 /* LastLiteralToken */, "Invalid token. Use 'createLiteralLikeNode' to create literals.");
                Debug.assert(token !== 79 /* Identifier */, "Invalid token. Use 'createIdentifier' to create identifiers");
                const node = createBaseToken(token);
                let transformFlags = 0 /* None */;
                switch (token) {
                    case 132 /* AsyncKeyword */:
                        transformFlags = 256 /* ContainsES2017 */ | 128 /* ContainsES2018 */;
                        break;
                    case 123 /* PublicKeyword */:
                    case 121 /* PrivateKeyword */:
                    case 122 /* ProtectedKeyword */:
                    case 146 /* ReadonlyKeyword */:
                    case 126 /* AbstractKeyword */:
                    case 136 /* DeclareKeyword */:
                    case 85 /* ConstKeyword */:
                    case 131 /* AnyKeyword */:
                    case 148 /* NumberKeyword */:
                    case 160 /* BigIntKeyword */:
                    case 144 /* NeverKeyword */:
                    case 149 /* ObjectKeyword */:
                    case 101 /* InKeyword */:
                    case 145 /* OutKeyword */:
                    case 161 /* OverrideKeyword */:
                    case 152 /* StringKeyword */:
                    case 134 /* BooleanKeyword */:
                    case 153 /* SymbolKeyword */:
                    case 114 /* VoidKeyword */:
                    case 157 /* UnknownKeyword */:
                    case 155 /* UndefinedKeyword */:
                        transformFlags = 1 /* ContainsTypeScript */;
                        break;
                    case 106 /* SuperKeyword */:
                        transformFlags = 1024 /* ContainsES2015 */ | 134217728 /* ContainsLexicalSuper */;
                        node.flowNode = void 0;
                        break;
                    case 124 /* StaticKeyword */:
                        transformFlags = 1024 /* ContainsES2015 */;
                        break;
                    case 127 /* AccessorKeyword */:
                        transformFlags = 16777216 /* ContainsClassFields */;
                        break;
                    case 108 /* ThisKeyword */:
                        transformFlags = 16384 /* ContainsLexicalThis */;
                        node.flowNode = void 0;
                        break;
                }
                if (transformFlags) {
                    node.transformFlags |= transformFlags;
                }
                return node;
            }
            function createSuper() {
                return createToken(106 /* SuperKeyword */);
            }
            function createThis() {
                return createToken(108 /* ThisKeyword */);
            }
            function createNull() {
                return createToken(104 /* NullKeyword */);
            }
            function createTrue() {
                return createToken(110 /* TrueKeyword */);
            }
            function createFalse() {
                return createToken(95 /* FalseKeyword */);
            }
            function createModifier(kind) {
                return createToken(kind);
            }
            function createModifiersFromModifierFlags(flags2) {
                const result = [];
                if (flags2 & 1 /* Export */)
                    result.push(createModifier(93 /* ExportKeyword */));
                if (flags2 & 2 /* Ambient */)
                    result.push(createModifier(136 /* DeclareKeyword */));
                if (flags2 & 1024 /* Default */)
                    result.push(createModifier(88 /* DefaultKeyword */));
                if (flags2 & 2048 /* Const */)
                    result.push(createModifier(85 /* ConstKeyword */));
                if (flags2 & 4 /* Public */)
                    result.push(createModifier(123 /* PublicKeyword */));
                if (flags2 & 8 /* Private */)
                    result.push(createModifier(121 /* PrivateKeyword */));
                if (flags2 & 16 /* Protected */)
                    result.push(createModifier(122 /* ProtectedKeyword */));
                if (flags2 & 256 /* Abstract */)
                    result.push(createModifier(126 /* AbstractKeyword */));
                if (flags2 & 32 /* Static */)
                    result.push(createModifier(124 /* StaticKeyword */));
                if (flags2 & 16384 /* Override */)
                    result.push(createModifier(161 /* OverrideKeyword */));
                if (flags2 & 64 /* Readonly */)
                    result.push(createModifier(146 /* ReadonlyKeyword */));
                if (flags2 & 128 /* Accessor */)
                    result.push(createModifier(127 /* AccessorKeyword */));
                if (flags2 & 512 /* Async */)
                    result.push(createModifier(132 /* AsyncKeyword */));
                if (flags2 & 32768 /* In */)
                    result.push(createModifier(101 /* InKeyword */));
                if (flags2 & 65536 /* Out */)
                    result.push(createModifier(145 /* OutKeyword */));
                return result.length ? result : void 0;
            }
            function createQualifiedName(left, right) {
                const node = createBaseNode(163 /* QualifiedName */);
                node.left = left;
                node.right = asName(right);
                node.transformFlags |= propagateChildFlags(node.left) | propagateIdentifierNameFlags(node.right);
                node.flowNode = void 0;
                return node;
            }
            function updateQualifiedName(node, left, right) {
                return node.left !== left || node.right !== right ? update(createQualifiedName(left, right), node) : node;
            }
            function createComputedPropertyName(expression) {
                const node = createBaseNode(164 /* ComputedPropertyName */);
                node.expression = parenthesizerRules().parenthesizeExpressionOfComputedPropertyName(expression);
                node.transformFlags |= propagateChildFlags(node.expression) | 1024 /* ContainsES2015 */ | 131072 /* ContainsComputedPropertyName */;
                return node;
            }
            function updateComputedPropertyName(node, expression) {
                return node.expression !== expression ? update(createComputedPropertyName(expression), node) : node;
            }
            function createTypeParameterDeclaration(modifiers, name, constraint, defaultType) {
                const node = createBaseDeclaration(165 /* TypeParameter */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.constraint = constraint;
                node.default = defaultType;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.expression = void 0;
                node.jsDoc = void 0;
                return node;
            }
            function updateTypeParameterDeclaration(node, modifiers, name, constraint, defaultType) {
                return node.modifiers !== modifiers || node.name !== name || node.constraint !== constraint || node.default !== defaultType ? update(createTypeParameterDeclaration(modifiers, name, constraint, defaultType), node) : node;
            }
            function createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer) {
                var _a2, _b;
                const node = createBaseDeclaration(166 /* Parameter */);
                node.modifiers = asNodeArray(modifiers);
                node.dotDotDotToken = dotDotDotToken;
                node.name = asName(name);
                node.questionToken = questionToken;
                node.type = type;
                node.initializer = asInitializer(initializer);
                if (isThisIdentifier(node.name)) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.dotDotDotToken) | propagateNameFlags(node.name) | propagateChildFlags(node.questionToken) | propagateChildFlags(node.initializer) | (((_a2 = node.questionToken) != null ? _a2 : node.type) ? 1 /* ContainsTypeScript */ : 0 /* None */) | (((_b = node.dotDotDotToken) != null ? _b : node.initializer) ? 1024 /* ContainsES2015 */ : 0 /* None */) | (modifiersToFlags(node.modifiers) & 16476 /* ParameterPropertyModifier */ ? 8192 /* ContainsTypeScriptClassSyntax */ : 0 /* None */);
                }
                node.jsDoc = void 0;
                return node;
            }
            function updateParameterDeclaration(node, modifiers, dotDotDotToken, name, questionToken, type, initializer) {
                return node.modifiers !== modifiers || node.dotDotDotToken !== dotDotDotToken || node.name !== name || node.questionToken !== questionToken || node.type !== type || node.initializer !== initializer ? update(createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer), node) : node;
            }
            function createDecorator(expression) {
                const node = createBaseNode(167 /* Decorator */);
                node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false);
                node.transformFlags |= propagateChildFlags(node.expression) | 1 /* ContainsTypeScript */ | 8192 /* ContainsTypeScriptClassSyntax */ | 33554432 /* ContainsDecorators */;
                return node;
            }
            function updateDecorator(node, expression) {
                return node.expression !== expression ? update(createDecorator(expression), node) : node;
            }
            function createPropertySignature(modifiers, name, questionToken, type) {
                const node = createBaseDeclaration(168 /* PropertySignature */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.type = type;
                node.questionToken = questionToken;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.initializer = void 0;
                node.jsDoc = void 0;
                return node;
            }
            function updatePropertySignature(node, modifiers, name, questionToken, type) {
                return node.modifiers !== modifiers || node.name !== name || node.questionToken !== questionToken || node.type !== type ? finishUpdatePropertySignature(createPropertySignature(modifiers, name, questionToken, type), node) : node;
            }
            function finishUpdatePropertySignature(updated, original) {
                if (updated !== original) {
                    updated.initializer = original.initializer;
                }
                return update(updated, original);
            }
            function createPropertyDeclaration(modifiers, name, questionOrExclamationToken, type, initializer) {
                const node = createBaseDeclaration(169 /* PropertyDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.questionToken = questionOrExclamationToken && isQuestionToken(questionOrExclamationToken) ? questionOrExclamationToken : void 0;
                node.exclamationToken = questionOrExclamationToken && isExclamationToken(questionOrExclamationToken) ? questionOrExclamationToken : void 0;
                node.type = type;
                node.initializer = asInitializer(initializer);
                const isAmbient = node.flags & 16777216 /* Ambient */ || modifiersToFlags(node.modifiers) & 2 /* Ambient */;
                node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateNameFlags(node.name) | propagateChildFlags(node.initializer) | (isAmbient || node.questionToken || node.exclamationToken || node.type ? 1 /* ContainsTypeScript */ : 0 /* None */) | (isComputedPropertyName(node.name) || modifiersToFlags(node.modifiers) & 32 /* Static */ && node.initializer ? 8192 /* ContainsTypeScriptClassSyntax */ : 0 /* None */) | 16777216 /* ContainsClassFields */;
                node.jsDoc = void 0;
                return node;
            }
            function updatePropertyDeclaration2(node, modifiers, name, questionOrExclamationToken, type, initializer) {
                return node.modifiers !== modifiers || node.name !== name || node.questionToken !== (questionOrExclamationToken !== void 0 && isQuestionToken(questionOrExclamationToken) ? questionOrExclamationToken : void 0) || node.exclamationToken !== (questionOrExclamationToken !== void 0 && isExclamationToken(questionOrExclamationToken) ? questionOrExclamationToken : void 0) || node.type !== type || node.initializer !== initializer ? update(createPropertyDeclaration(modifiers, name, questionOrExclamationToken, type, initializer), node) : node;
            }
            function createMethodSignature(modifiers, name, questionToken, typeParameters, parameters, type) {
                const node = createBaseDeclaration(170 /* MethodSignature */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.questionToken = questionToken;
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }
            function updateMethodSignature(node, modifiers, name, questionToken, typeParameters, parameters, type) {
                return node.modifiers !== modifiers || node.name !== name || node.questionToken !== questionToken || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? finishUpdateBaseSignatureDeclaration(createMethodSignature(modifiers, name, questionToken, typeParameters, parameters, type), node) : node;
            }
            function createMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body) {
                const node = createBaseDeclaration(171 /* MethodDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.asteriskToken = asteriskToken;
                node.name = asName(name);
                node.questionToken = questionToken;
                node.exclamationToken = void 0;
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = createNodeArray(parameters);
                node.type = type;
                node.body = body;
                if (!node.body) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    const isAsync = modifiersToFlags(node.modifiers) & 512 /* Async */;
                    const isGenerator = !!node.asteriskToken;
                    const isAsyncGenerator = isAsync && isGenerator;
                    node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.asteriskToken) | propagateNameFlags(node.name) | propagateChildFlags(node.questionToken) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.type) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | (isAsyncGenerator ? 128 /* ContainsES2018 */ : isAsync ? 256 /* ContainsES2017 */ : isGenerator ? 2048 /* ContainsGenerator */ : 0 /* None */) | (node.questionToken || node.typeParameters || node.type ? 1 /* ContainsTypeScript */ : 0 /* None */) | 1024 /* ContainsES2015 */;
                }
                node.typeArguments = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }
            function updateMethodDeclaration(node, modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body) {
                return node.modifiers !== modifiers || node.asteriskToken !== asteriskToken || node.name !== name || node.questionToken !== questionToken || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type || node.body !== body ? finishUpdateMethodDeclaration(createMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body), node) : node;
            }
            function finishUpdateMethodDeclaration(updated, original) {
                if (updated !== original) {
                    updated.exclamationToken = original.exclamationToken;
                }
                return update(updated, original);
            }
            function createClassStaticBlockDeclaration(body) {
                const node = createBaseDeclaration(172 /* ClassStaticBlockDeclaration */);
                node.body = body;
                node.transformFlags = propagateChildFlags(body) | 16777216 /* ContainsClassFields */;
                node.modifiers = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }
            function updateClassStaticBlockDeclaration(node, body) {
                return node.body !== body ? finishUpdateClassStaticBlockDeclaration(createClassStaticBlockDeclaration(body), node) : node;
            }
            function finishUpdateClassStaticBlockDeclaration(updated, original) {
                if (updated !== original) {
                    updated.modifiers = original.modifiers;
                }
                return update(updated, original);
            }
            function createConstructorDeclaration(modifiers, parameters, body) {
                const node = createBaseDeclaration(173 /* Constructor */);
                node.modifiers = asNodeArray(modifiers);
                node.parameters = createNodeArray(parameters);
                node.body = body;
                node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | 1024 /* ContainsES2015 */;
                node.typeParameters = void 0;
                node.type = void 0;
                node.typeArguments = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }
            function updateConstructorDeclaration(node, modifiers, parameters, body) {
                return node.modifiers !== modifiers || node.parameters !== parameters || node.body !== body ? finishUpdateConstructorDeclaration(createConstructorDeclaration(modifiers, parameters, body), node) : node;
            }
            function finishUpdateConstructorDeclaration(updated, original) {
                if (updated !== original) {
                    updated.typeParameters = original.typeParameters;
                    updated.type = original.type;
                }
                return finishUpdateBaseSignatureDeclaration(updated, original);
            }
            function createGetAccessorDeclaration(modifiers, name, parameters, type, body) {
                const node = createBaseDeclaration(174 /* GetAccessor */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.parameters = createNodeArray(parameters);
                node.type = type;
                node.body = body;
                if (!node.body) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateNameFlags(node.name) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.type) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | (node.type ? 1 /* ContainsTypeScript */ : 0 /* None */);
                }
                node.typeArguments = void 0;
                node.typeParameters = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }
            function updateGetAccessorDeclaration(node, modifiers, name, parameters, type, body) {
                return node.modifiers !== modifiers || node.name !== name || node.parameters !== parameters || node.type !== type || node.body !== body ? finishUpdateGetAccessorDeclaration(createGetAccessorDeclaration(modifiers, name, parameters, type, body), node) : node;
            }
            function finishUpdateGetAccessorDeclaration(updated, original) {
                if (updated !== original) {
                    updated.typeParameters = original.typeParameters;
                }
                return finishUpdateBaseSignatureDeclaration(updated, original);
            }
            function createSetAccessorDeclaration(modifiers, name, parameters, body) {
                const node = createBaseDeclaration(175 /* SetAccessor */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.parameters = createNodeArray(parameters);
                node.body = body;
                if (!node.body) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateNameFlags(node.name) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | (node.type ? 1 /* ContainsTypeScript */ : 0 /* None */);
                }
                node.typeArguments = void 0;
                node.typeParameters = void 0;
                node.type = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }
            function updateSetAccessorDeclaration(node, modifiers, name, parameters, body) {
                return node.modifiers !== modifiers || node.name !== name || node.parameters !== parameters || node.body !== body ? finishUpdateSetAccessorDeclaration(createSetAccessorDeclaration(modifiers, name, parameters, body), node) : node;
            }
            function finishUpdateSetAccessorDeclaration(updated, original) {
                if (updated !== original) {
                    updated.typeParameters = original.typeParameters;
                    updated.type = original.type;
                }
                return finishUpdateBaseSignatureDeclaration(updated, original);
            }
            function createCallSignature(typeParameters, parameters, type) {
                const node = createBaseDeclaration(176 /* CallSignature */);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }
            function updateCallSignature(node, typeParameters, parameters, type) {
                return node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? finishUpdateBaseSignatureDeclaration(createCallSignature(typeParameters, parameters, type), node) : node;
            }
            function createConstructSignature(typeParameters, parameters, type) {
                const node = createBaseDeclaration(177 /* ConstructSignature */);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }
            function updateConstructSignature(node, typeParameters, parameters, type) {
                return node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? finishUpdateBaseSignatureDeclaration(createConstructSignature(typeParameters, parameters, type), node) : node;
            }
            function createIndexSignature(modifiers, parameters, type) {
                const node = createBaseDeclaration(178 /* IndexSignature */);
                node.modifiers = asNodeArray(modifiers);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }
            function updateIndexSignature(node, modifiers, parameters, type) {
                return node.parameters !== parameters || node.type !== type || node.modifiers !== modifiers ? finishUpdateBaseSignatureDeclaration(createIndexSignature(modifiers, parameters, type), node) : node;
            }
            function createTemplateLiteralTypeSpan(type, literal) {
                const node = createBaseNode(201 /* TemplateLiteralTypeSpan */);
                node.type = type;
                node.literal = literal;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateTemplateLiteralTypeSpan(node, type, literal) {
                return node.type !== type || node.literal !== literal ? update(createTemplateLiteralTypeSpan(type, literal), node) : node;
            }
            function createKeywordTypeNode(kind) {
                return createToken(kind);
            }
            function createTypePredicateNode(assertsModifier, parameterName, type) {
                const node = createBaseNode(179 /* TypePredicate */);
                node.assertsModifier = assertsModifier;
                node.parameterName = asName(parameterName);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateTypePredicateNode(node, assertsModifier, parameterName, type) {
                return node.assertsModifier !== assertsModifier || node.parameterName !== parameterName || node.type !== type ? update(createTypePredicateNode(assertsModifier, parameterName, type), node) : node;
            }
            function createTypeReferenceNode(typeName, typeArguments) {
                const node = createBaseNode(180 /* TypeReference */);
                node.typeName = asName(typeName);
                node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(createNodeArray(typeArguments));
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateTypeReferenceNode(node, typeName, typeArguments) {
                return node.typeName !== typeName || node.typeArguments !== typeArguments ? update(createTypeReferenceNode(typeName, typeArguments), node) : node;
            }
            function createFunctionTypeNode(typeParameters, parameters, type) {
                const node = createBaseDeclaration(181 /* FunctionType */);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.modifiers = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }
            function updateFunctionTypeNode(node, typeParameters, parameters, type) {
                return node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? finishUpdateFunctionTypeNode(createFunctionTypeNode(typeParameters, parameters, type), node) : node;
            }
            function finishUpdateFunctionTypeNode(updated, original) {
                if (updated !== original) {
                    updated.modifiers = original.modifiers;
                }
                return finishUpdateBaseSignatureDeclaration(updated, original);
            }
            function createConstructorTypeNode(...args) {
                return args.length === 4 ? createConstructorTypeNode1(...args) : args.length === 3 ? createConstructorTypeNode2(...args) : Debug.fail("Incorrect number of arguments specified.");
            }
            function createConstructorTypeNode1(modifiers, typeParameters, parameters, type) {
                const node = createBaseDeclaration(182 /* ConstructorType */);
                node.modifiers = asNodeArray(modifiers);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }
            function createConstructorTypeNode2(typeParameters, parameters, type) {
                return createConstructorTypeNode1(
                /*modifiers*/
                void 0, typeParameters, parameters, type);
            }
            function updateConstructorTypeNode(...args) {
                return args.length === 5 ? updateConstructorTypeNode1(...args) : args.length === 4 ? updateConstructorTypeNode2(...args) : Debug.fail("Incorrect number of arguments specified.");
            }
            function updateConstructorTypeNode1(node, modifiers, typeParameters, parameters, type) {
                return node.modifiers !== modifiers || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? finishUpdateBaseSignatureDeclaration(createConstructorTypeNode(modifiers, typeParameters, parameters, type), node) : node;
            }
            function updateConstructorTypeNode2(node, typeParameters, parameters, type) {
                return updateConstructorTypeNode1(node, node.modifiers, typeParameters, parameters, type);
            }
            function createTypeQueryNode(exprName, typeArguments) {
                const node = createBaseNode(183 /* TypeQuery */);
                node.exprName = exprName;
                node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateTypeQueryNode(node, exprName, typeArguments) {
                return node.exprName !== exprName || node.typeArguments !== typeArguments ? update(createTypeQueryNode(exprName, typeArguments), node) : node;
            }
            function createTypeLiteralNode(members) {
                const node = createBaseDeclaration(184 /* TypeLiteral */);
                node.members = createNodeArray(members);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateTypeLiteralNode(node, members) {
                return node.members !== members ? update(createTypeLiteralNode(members), node) : node;
            }
            function createArrayTypeNode(elementType) {
                const node = createBaseNode(185 /* ArrayType */);
                node.elementType = parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(elementType);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateArrayTypeNode(node, elementType) {
                return node.elementType !== elementType ? update(createArrayTypeNode(elementType), node) : node;
            }
            function createTupleTypeNode(elements) {
                const node = createBaseNode(186 /* TupleType */);
                node.elements = createNodeArray(parenthesizerRules().parenthesizeElementTypesOfTupleType(elements));
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateTupleTypeNode(node, elements) {
                return node.elements !== elements ? update(createTupleTypeNode(elements), node) : node;
            }
            function createNamedTupleMember(dotDotDotToken, name, questionToken, type) {
                const node = createBaseDeclaration(199 /* NamedTupleMember */);
                node.dotDotDotToken = dotDotDotToken;
                node.name = name;
                node.questionToken = questionToken;
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                return node;
            }
            function updateNamedTupleMember(node, dotDotDotToken, name, questionToken, type) {
                return node.dotDotDotToken !== dotDotDotToken || node.name !== name || node.questionToken !== questionToken || node.type !== type ? update(createNamedTupleMember(dotDotDotToken, name, questionToken, type), node) : node;
            }
            function createOptionalTypeNode(type) {
                const node = createBaseNode(187 /* OptionalType */);
                node.type = parenthesizerRules().parenthesizeTypeOfOptionalType(type);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateOptionalTypeNode(node, type) {
                return node.type !== type ? update(createOptionalTypeNode(type), node) : node;
            }
            function createRestTypeNode(type) {
                const node = createBaseNode(188 /* RestType */);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateRestTypeNode(node, type) {
                return node.type !== type ? update(createRestTypeNode(type), node) : node;
            }
            function createUnionOrIntersectionTypeNode(kind, types, parenthesize) {
                const node = createBaseNode(kind);
                node.types = factory2.createNodeArray(parenthesize(types));
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateUnionOrIntersectionTypeNode(node, types, parenthesize) {
                return node.types !== types ? update(createUnionOrIntersectionTypeNode(node.kind, types, parenthesize), node) : node;
            }
            function createUnionTypeNode(types) {
                return createUnionOrIntersectionTypeNode(189 /* UnionType */, types, parenthesizerRules().parenthesizeConstituentTypesOfUnionType);
            }
            function updateUnionTypeNode(node, types) {
                return updateUnionOrIntersectionTypeNode(node, types, parenthesizerRules().parenthesizeConstituentTypesOfUnionType);
            }
            function createIntersectionTypeNode(types) {
                return createUnionOrIntersectionTypeNode(190 /* IntersectionType */, types, parenthesizerRules().parenthesizeConstituentTypesOfIntersectionType);
            }
            function updateIntersectionTypeNode(node, types) {
                return updateUnionOrIntersectionTypeNode(node, types, parenthesizerRules().parenthesizeConstituentTypesOfIntersectionType);
            }
            function createConditionalTypeNode(checkType, extendsType, trueType, falseType) {
                const node = createBaseNode(191 /* ConditionalType */);
                node.checkType = parenthesizerRules().parenthesizeCheckTypeOfConditionalType(checkType);
                node.extendsType = parenthesizerRules().parenthesizeExtendsTypeOfConditionalType(extendsType);
                node.trueType = trueType;
                node.falseType = falseType;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateConditionalTypeNode(node, checkType, extendsType, trueType, falseType) {
                return node.checkType !== checkType || node.extendsType !== extendsType || node.trueType !== trueType || node.falseType !== falseType ? update(createConditionalTypeNode(checkType, extendsType, trueType, falseType), node) : node;
            }
            function createInferTypeNode(typeParameter) {
                const node = createBaseNode(192 /* InferType */);
                node.typeParameter = typeParameter;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateInferTypeNode(node, typeParameter) {
                return node.typeParameter !== typeParameter ? update(createInferTypeNode(typeParameter), node) : node;
            }
            function createTemplateLiteralType(head, templateSpans) {
                const node = createBaseNode(200 /* TemplateLiteralType */);
                node.head = head;
                node.templateSpans = createNodeArray(templateSpans);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateTemplateLiteralType(node, head, templateSpans) {
                return node.head !== head || node.templateSpans !== templateSpans ? update(createTemplateLiteralType(head, templateSpans), node) : node;
            }
            function createImportTypeNode(argument, assertions, qualifier, typeArguments, isTypeOf = false) {
                const node = createBaseNode(202 /* ImportType */);
                node.argument = argument;
                node.assertions = assertions;
                node.qualifier = qualifier;
                node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
                node.isTypeOf = isTypeOf;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateImportTypeNode(node, argument, assertions, qualifier, typeArguments, isTypeOf = node.isTypeOf) {
                return node.argument !== argument || node.assertions !== assertions || node.qualifier !== qualifier || node.typeArguments !== typeArguments || node.isTypeOf !== isTypeOf ? update(createImportTypeNode(argument, assertions, qualifier, typeArguments, isTypeOf), node) : node;
            }
            function createParenthesizedType(type) {
                const node = createBaseNode(193 /* ParenthesizedType */);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateParenthesizedType(node, type) {
                return node.type !== type ? update(createParenthesizedType(type), node) : node;
            }
            function createThisTypeNode() {
                const node = createBaseNode(194 /* ThisType */);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function createTypeOperatorNode(operator, type) {
                const node = createBaseNode(195 /* TypeOperator */);
                node.operator = operator;
                node.type = operator === 146 /* ReadonlyKeyword */ ? parenthesizerRules().parenthesizeOperandOfReadonlyTypeOperator(type) : parenthesizerRules().parenthesizeOperandOfTypeOperator(type);
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateTypeOperatorNode(node, type) {
                return node.type !== type ? update(createTypeOperatorNode(node.operator, type), node) : node;
            }
            function createIndexedAccessTypeNode(objectType, indexType) {
                const node = createBaseNode(196 /* IndexedAccessType */);
                node.objectType = parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(objectType);
                node.indexType = indexType;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateIndexedAccessTypeNode(node, objectType, indexType) {
                return node.objectType !== objectType || node.indexType !== indexType ? update(createIndexedAccessTypeNode(objectType, indexType), node) : node;
            }
            function createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members) {
                const node = createBaseDeclaration(197 /* MappedType */);
                node.readonlyToken = readonlyToken;
                node.typeParameter = typeParameter;
                node.nameType = nameType;
                node.questionToken = questionToken;
                node.type = type;
                node.members = members && createNodeArray(members);
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateMappedTypeNode(node, readonlyToken, typeParameter, nameType, questionToken, type, members) {
                return node.readonlyToken !== readonlyToken || node.typeParameter !== typeParameter || node.nameType !== nameType || node.questionToken !== questionToken || node.type !== type || node.members !== members ? update(createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members), node) : node;
            }
            function createLiteralTypeNode(literal) {
                const node = createBaseNode(198 /* LiteralType */);
                node.literal = literal;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }
            function updateLiteralTypeNode(node, literal) {
                return node.literal !== literal ? update(createLiteralTypeNode(literal), node) : node;
            }
            function createObjectBindingPattern(elements) {
                const node = createBaseNode(203 /* ObjectBindingPattern */);
                node.elements = createNodeArray(elements);
                node.transformFlags |= propagateChildrenFlags(node.elements) | 1024 /* ContainsES2015 */ | 524288 /* ContainsBindingPattern */;
                if (node.transformFlags & 32768 /* ContainsRestOrSpread */) {
                    node.transformFlags |= 128 /* ContainsES2018 */ | 65536 /* ContainsObjectRestOrSpread */;
                }
                return node;
            }
            function updateObjectBindingPattern(node, elements) {
                return node.elements !== elements ? update(createObjectBindingPattern(elements), node) : node;
            }
            function createArrayBindingPattern(elements) {
                const node = createBaseNode(204 /* ArrayBindingPattern */);
                node.elements = createNodeArray(elements);
                node.transformFlags |= propagateChildrenFlags(node.elements) | 1024 /* ContainsES2015 */ | 524288 /* ContainsBindingPattern */;
                return node;
            }
            function updateArrayBindingPattern(node, elements) {
                return node.elements !== elements ? update(createArrayBindingPattern(elements), node) : node;
            }
            function createBindingElement(dotDotDotToken, propertyName, name, initializer) {
                const node = createBaseDeclaration(205 /* BindingElement */);
                node.dotDotDotToken = dotDotDotToken;
                node.propertyName = asName(propertyName);
                node.name = asName(name);
                node.initializer = asInitializer(initializer);
                node.transformFlags |= propagateChildFlags(node.dotDotDotToken) | propagateNameFlags(node.propertyName) | propagateNameFlags(node.name) | propagateChildFlags(node.initializer) | (node.dotDotDotToken ? 32768 /* ContainsRestOrSpread */ : 0 /* None */) | 1024 /* ContainsES2015 */;
                node.flowNode = void 0;
                return node;
            }
            function updateBindingElement(node, dotDotDotToken, propertyName, name, initializer) {
                return node.propertyName !== propertyName || node.dotDotDotToken !== dotDotDotToken || node.name !== name || node.initializer !== initializer ? update(createBindingElement(dotDotDotToken, propertyName, name, initializer), node) : node;
            }
            function createArrayLiteralExpression(elements, multiLine) {
                const node = createBaseNode(206 /* ArrayLiteralExpression */);
                const lastElement = elements && lastOrUndefined(elements);
                const elementsArray = createNodeArray(elements, lastElement && isOmittedExpression(lastElement) ? true : void 0);
                node.elements = parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(elementsArray);
                node.multiLine = multiLine;
                node.transformFlags |= propagateChildrenFlags(node.elements);
                return node;
            }
            function updateArrayLiteralExpression(node, elements) {
                return node.elements !== elements ? update(createArrayLiteralExpression(elements, node.multiLine), node) : node;
            }
            function createObjectLiteralExpression(properties, multiLine) {
                const node = createBaseDeclaration(207 /* ObjectLiteralExpression */);
                node.properties = createNodeArray(properties);
                node.multiLine = multiLine;
                node.transformFlags |= propagateChildrenFlags(node.properties);
                node.jsDoc = void 0;
                return node;
            }
            function updateObjectLiteralExpression(node, properties) {
                return node.properties !== properties ? update(createObjectLiteralExpression(properties, node.multiLine), node) : node;
            }
            function createBasePropertyAccessExpression(expression, questionDotToken, name) {
                const node = createBaseDeclaration(208 /* PropertyAccessExpression */);
                node.expression = expression;
                node.questionDotToken = questionDotToken;
                node.name = name;
                node.transformFlags = propagateChildFlags(node.expression) | propagateChildFlags(node.questionDotToken) | (isIdentifier(node.name) ? propagateIdentifierNameFlags(node.name) : propagateChildFlags(node.name) | 536870912 /* ContainsPrivateIdentifierInExpression */);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function createPropertyAccessExpression(expression, name) {
                const node = createBasePropertyAccessExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false), 
                /*questionDotToken*/
                void 0, asName(name));
                if (isSuperKeyword(expression)) {
                    node.transformFlags |= 256 /* ContainsES2017 */ | 128 /* ContainsES2018 */;
                }
                return node;
            }
            function updatePropertyAccessExpression(node, expression, name) {
                if (isPropertyAccessChain(node)) {
                    return updatePropertyAccessChain(node, expression, node.questionDotToken, cast(name, isIdentifier));
                }
                return node.expression !== expression || node.name !== name ? update(createPropertyAccessExpression(expression, name), node) : node;
            }
            function createPropertyAccessChain(expression, questionDotToken, name) {
                const node = createBasePropertyAccessExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                true), questionDotToken, asName(name));
                node.flags |= 32 /* OptionalChain */;
                node.transformFlags |= 32 /* ContainsES2020 */;
                return node;
            }
            function updatePropertyAccessChain(node, expression, questionDotToken, name) {
                Debug.assert(!!(node.flags & 32 /* OptionalChain */), "Cannot update a PropertyAccessExpression using updatePropertyAccessChain. Use updatePropertyAccess instead.");
                return node.expression !== expression || node.questionDotToken !== questionDotToken || node.name !== name ? update(createPropertyAccessChain(expression, questionDotToken, name), node) : node;
            }
            function createBaseElementAccessExpression(expression, questionDotToken, argumentExpression) {
                const node = createBaseDeclaration(209 /* ElementAccessExpression */);
                node.expression = expression;
                node.questionDotToken = questionDotToken;
                node.argumentExpression = argumentExpression;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.questionDotToken) | propagateChildFlags(node.argumentExpression);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function createElementAccessExpression(expression, index) {
                const node = createBaseElementAccessExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false), 
                /*questionDotToken*/
                void 0, asExpression(index));
                if (isSuperKeyword(expression)) {
                    node.transformFlags |= 256 /* ContainsES2017 */ | 128 /* ContainsES2018 */;
                }
                return node;
            }
            function updateElementAccessExpression(node, expression, argumentExpression) {
                if (isElementAccessChain(node)) {
                    return updateElementAccessChain(node, expression, node.questionDotToken, argumentExpression);
                }
                return node.expression !== expression || node.argumentExpression !== argumentExpression ? update(createElementAccessExpression(expression, argumentExpression), node) : node;
            }
            function createElementAccessChain(expression, questionDotToken, index) {
                const node = createBaseElementAccessExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                true), questionDotToken, asExpression(index));
                node.flags |= 32 /* OptionalChain */;
                node.transformFlags |= 32 /* ContainsES2020 */;
                return node;
            }
            function updateElementAccessChain(node, expression, questionDotToken, argumentExpression) {
                Debug.assert(!!(node.flags & 32 /* OptionalChain */), "Cannot update a ElementAccessExpression using updateElementAccessChain. Use updateElementAccess instead.");
                return node.expression !== expression || node.questionDotToken !== questionDotToken || node.argumentExpression !== argumentExpression ? update(createElementAccessChain(expression, questionDotToken, argumentExpression), node) : node;
            }
            function createBaseCallExpression(expression, questionDotToken, typeArguments, argumentsArray) {
                const node = createBaseDeclaration(210 /* CallExpression */);
                node.expression = expression;
                node.questionDotToken = questionDotToken;
                node.typeArguments = typeArguments;
                node.arguments = argumentsArray;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.questionDotToken) | propagateChildrenFlags(node.typeArguments) | propagateChildrenFlags(node.arguments);
                if (node.typeArguments) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                if (isSuperProperty(node.expression)) {
                    node.transformFlags |= 16384 /* ContainsLexicalThis */;
                }
                return node;
            }
            function createCallExpression(expression, typeArguments, argumentsArray) {
                const node = createBaseCallExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false), 
                /*questionDotToken*/
                void 0, asNodeArray(typeArguments), parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)));
                if (isImportKeyword(node.expression)) {
                    node.transformFlags |= 8388608 /* ContainsDynamicImport */;
                }
                return node;
            }
            function updateCallExpression(node, expression, typeArguments, argumentsArray) {
                if (isCallChain(node)) {
                    return updateCallChain(node, expression, node.questionDotToken, typeArguments, argumentsArray);
                }
                return node.expression !== expression || node.typeArguments !== typeArguments || node.arguments !== argumentsArray ? update(createCallExpression(expression, typeArguments, argumentsArray), node) : node;
            }
            function createCallChain(expression, questionDotToken, typeArguments, argumentsArray) {
                const node = createBaseCallExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                true), questionDotToken, asNodeArray(typeArguments), parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)));
                node.flags |= 32 /* OptionalChain */;
                node.transformFlags |= 32 /* ContainsES2020 */;
                return node;
            }
            function updateCallChain(node, expression, questionDotToken, typeArguments, argumentsArray) {
                Debug.assert(!!(node.flags & 32 /* OptionalChain */), "Cannot update a CallExpression using updateCallChain. Use updateCall instead.");
                return node.expression !== expression || node.questionDotToken !== questionDotToken || node.typeArguments !== typeArguments || node.arguments !== argumentsArray ? update(createCallChain(expression, questionDotToken, typeArguments, argumentsArray), node) : node;
            }
            function createNewExpression(expression, typeArguments, argumentsArray) {
                const node = createBaseDeclaration(211 /* NewExpression */);
                node.expression = parenthesizerRules().parenthesizeExpressionOfNew(expression);
                node.typeArguments = asNodeArray(typeArguments);
                node.arguments = argumentsArray ? parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(argumentsArray) : void 0;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildrenFlags(node.typeArguments) | propagateChildrenFlags(node.arguments) | 32 /* ContainsES2020 */;
                if (node.typeArguments) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                return node;
            }
            function updateNewExpression(node, expression, typeArguments, argumentsArray) {
                return node.expression !== expression || node.typeArguments !== typeArguments || node.arguments !== argumentsArray ? update(createNewExpression(expression, typeArguments, argumentsArray), node) : node;
            }
            function createTaggedTemplateExpression(tag, typeArguments, template) {
                const node = createBaseNode(212 /* TaggedTemplateExpression */);
                node.tag = parenthesizerRules().parenthesizeLeftSideOfAccess(tag, 
                /*optionalChain*/
                false);
                node.typeArguments = asNodeArray(typeArguments);
                node.template = template;
                node.transformFlags |= propagateChildFlags(node.tag) | propagateChildrenFlags(node.typeArguments) | propagateChildFlags(node.template) | 1024 /* ContainsES2015 */;
                if (node.typeArguments) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                if (hasInvalidEscape(node.template)) {
                    node.transformFlags |= 128 /* ContainsES2018 */;
                }
                return node;
            }
            function updateTaggedTemplateExpression(node, tag, typeArguments, template) {
                return node.tag !== tag || node.typeArguments !== typeArguments || node.template !== template ? update(createTaggedTemplateExpression(tag, typeArguments, template), node) : node;
            }
            function createTypeAssertion(type, expression) {
                const node = createBaseNode(213 /* TypeAssertionExpression */);
                node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
                node.type = type;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.type) | 1 /* ContainsTypeScript */;
                return node;
            }
            function updateTypeAssertion(node, type, expression) {
                return node.type !== type || node.expression !== expression ? update(createTypeAssertion(type, expression), node) : node;
            }
            function createParenthesizedExpression(expression) {
                const node = createBaseNode(214 /* ParenthesizedExpression */);
                node.expression = expression;
                node.transformFlags = propagateChildFlags(node.expression);
                node.jsDoc = void 0;
                return node;
            }
            function updateParenthesizedExpression(node, expression) {
                return node.expression !== expression ? update(createParenthesizedExpression(expression), node) : node;
            }
            function createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body) {
                const node = createBaseDeclaration(215 /* FunctionExpression */);
                node.modifiers = asNodeArray(modifiers);
                node.asteriskToken = asteriskToken;
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = createNodeArray(parameters);
                node.type = type;
                node.body = body;
                const isAsync = modifiersToFlags(node.modifiers) & 512 /* Async */;
                const isGenerator = !!node.asteriskToken;
                const isAsyncGenerator = isAsync && isGenerator;
                node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.asteriskToken) | propagateNameFlags(node.name) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.type) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | (isAsyncGenerator ? 128 /* ContainsES2018 */ : isAsync ? 256 /* ContainsES2017 */ : isGenerator ? 2048 /* ContainsGenerator */ : 0 /* None */) | (node.typeParameters || node.type ? 1 /* ContainsTypeScript */ : 0 /* None */) | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                node.typeArguments = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }
            function updateFunctionExpression(node, modifiers, asteriskToken, name, typeParameters, parameters, type, body) {
                return node.name !== name || node.modifiers !== modifiers || node.asteriskToken !== asteriskToken || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type || node.body !== body ? finishUpdateBaseSignatureDeclaration(createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body), node) : node;
            }
            function createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body) {
                const node = createBaseDeclaration(216 /* ArrowFunction */);
                node.modifiers = asNodeArray(modifiers);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = createNodeArray(parameters);
                node.type = type;
                node.equalsGreaterThanToken = equalsGreaterThanToken != null ? equalsGreaterThanToken : createToken(38 /* EqualsGreaterThanToken */);
                node.body = parenthesizerRules().parenthesizeConciseBodyOfArrowFunction(body);
                const isAsync = modifiersToFlags(node.modifiers) & 512 /* Async */;
                node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.type) | propagateChildFlags(node.equalsGreaterThanToken) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | (node.typeParameters || node.type ? 1 /* ContainsTypeScript */ : 0 /* None */) | (isAsync ? 256 /* ContainsES2017 */ | 16384 /* ContainsLexicalThis */ : 0 /* None */) | 1024 /* ContainsES2015 */;
                node.typeArguments = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }
            function updateArrowFunction(node, modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body) {
                return node.modifiers !== modifiers || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type || node.equalsGreaterThanToken !== equalsGreaterThanToken || node.body !== body ? finishUpdateBaseSignatureDeclaration(createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body), node) : node;
            }
            function createDeleteExpression(expression) {
                const node = createBaseNode(217 /* DeleteExpression */);
                node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
                node.transformFlags |= propagateChildFlags(node.expression);
                return node;
            }
            function updateDeleteExpression(node, expression) {
                return node.expression !== expression ? update(createDeleteExpression(expression), node) : node;
            }
            function createTypeOfExpression(expression) {
                const node = createBaseNode(218 /* TypeOfExpression */);
                node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
                node.transformFlags |= propagateChildFlags(node.expression);
                return node;
            }
            function updateTypeOfExpression(node, expression) {
                return node.expression !== expression ? update(createTypeOfExpression(expression), node) : node;
            }
            function createVoidExpression(expression) {
                const node = createBaseNode(219 /* VoidExpression */);
                node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
                node.transformFlags |= propagateChildFlags(node.expression);
                return node;
            }
            function updateVoidExpression(node, expression) {
                return node.expression !== expression ? update(createVoidExpression(expression), node) : node;
            }
            function createAwaitExpression(expression) {
                const node = createBaseNode(220 /* AwaitExpression */);
                node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
                node.transformFlags |= propagateChildFlags(node.expression) | 256 /* ContainsES2017 */ | 128 /* ContainsES2018 */ | 2097152 /* ContainsAwait */;
                return node;
            }
            function updateAwaitExpression(node, expression) {
                return node.expression !== expression ? update(createAwaitExpression(expression), node) : node;
            }
            function createPrefixUnaryExpression(operator, operand) {
                const node = createBaseNode(221 /* PrefixUnaryExpression */);
                node.operator = operator;
                node.operand = parenthesizerRules().parenthesizeOperandOfPrefixUnary(operand);
                node.transformFlags |= propagateChildFlags(node.operand);
                if ((operator === 45 /* PlusPlusToken */ || operator === 46 /* MinusMinusToken */) && isIdentifier(node.operand) && !isGeneratedIdentifier(node.operand) && !isLocalName(node.operand)) {
                    node.transformFlags |= 268435456 /* ContainsUpdateExpressionForIdentifier */;
                }
                return node;
            }
            function updatePrefixUnaryExpression(node, operand) {
                return node.operand !== operand ? update(createPrefixUnaryExpression(node.operator, operand), node) : node;
            }
            function createPostfixUnaryExpression(operand, operator) {
                const node = createBaseNode(222 /* PostfixUnaryExpression */);
                node.operator = operator;
                node.operand = parenthesizerRules().parenthesizeOperandOfPostfixUnary(operand);
                node.transformFlags |= propagateChildFlags(node.operand);
                if (isIdentifier(node.operand) && !isGeneratedIdentifier(node.operand) && !isLocalName(node.operand)) {
                    node.transformFlags |= 268435456 /* ContainsUpdateExpressionForIdentifier */;
                }
                return node;
            }
            function updatePostfixUnaryExpression(node, operand) {
                return node.operand !== operand ? update(createPostfixUnaryExpression(operand, node.operator), node) : node;
            }
            function createBinaryExpression(left, operator, right) {
                const node = createBaseDeclaration(223 /* BinaryExpression */);
                const operatorToken = asToken(operator);
                const operatorKind = operatorToken.kind;
                node.left = parenthesizerRules().parenthesizeLeftSideOfBinary(operatorKind, left);
                node.operatorToken = operatorToken;
                node.right = parenthesizerRules().parenthesizeRightSideOfBinary(operatorKind, node.left, right);
                node.transformFlags |= propagateChildFlags(node.left) | propagateChildFlags(node.operatorToken) | propagateChildFlags(node.right);
                if (operatorKind === 60 /* QuestionQuestionToken */) {
                    node.transformFlags |= 32 /* ContainsES2020 */;
                }
                else if (operatorKind === 63 /* EqualsToken */) {
                    if (isObjectLiteralExpression(node.left)) {
                        node.transformFlags |= 1024 /* ContainsES2015 */ | 128 /* ContainsES2018 */ | 4096 /* ContainsDestructuringAssignment */ | propagateAssignmentPatternFlags(node.left);
                    }
                    else if (isArrayLiteralExpression(node.left)) {
                        node.transformFlags |= 1024 /* ContainsES2015 */ | 4096 /* ContainsDestructuringAssignment */ | propagateAssignmentPatternFlags(node.left);
                    }
                }
                else if (operatorKind === 42 /* AsteriskAsteriskToken */ || operatorKind === 67 /* AsteriskAsteriskEqualsToken */) {
                    node.transformFlags |= 512 /* ContainsES2016 */;
                }
                else if (isLogicalOrCoalescingAssignmentOperator(operatorKind)) {
                    node.transformFlags |= 16 /* ContainsES2021 */;
                }
                if (operatorKind === 101 /* InKeyword */ && isPrivateIdentifier(node.left)) {
                    node.transformFlags |= 536870912 /* ContainsPrivateIdentifierInExpression */;
                }
                node.jsDoc = void 0;
                return node;
            }
            function propagateAssignmentPatternFlags(node) {
                return containsObjectRestOrSpread(node) ? 65536 /* ContainsObjectRestOrSpread */ : 0 /* None */;
            }
            function updateBinaryExpression(node, left, operator, right) {
                return node.left !== left || node.operatorToken !== operator || node.right !== right ? update(createBinaryExpression(left, operator, right), node) : node;
            }
            function createConditionalExpression(condition, questionToken, whenTrue, colonToken, whenFalse) {
                const node = createBaseNode(224 /* ConditionalExpression */);
                node.condition = parenthesizerRules().parenthesizeConditionOfConditionalExpression(condition);
                node.questionToken = questionToken != null ? questionToken : createToken(57 /* QuestionToken */);
                node.whenTrue = parenthesizerRules().parenthesizeBranchOfConditionalExpression(whenTrue);
                node.colonToken = colonToken != null ? colonToken : createToken(58 /* ColonToken */);
                node.whenFalse = parenthesizerRules().parenthesizeBranchOfConditionalExpression(whenFalse);
                node.transformFlags |= propagateChildFlags(node.condition) | propagateChildFlags(node.questionToken) | propagateChildFlags(node.whenTrue) | propagateChildFlags(node.colonToken) | propagateChildFlags(node.whenFalse);
                return node;
            }
            function updateConditionalExpression(node, condition, questionToken, whenTrue, colonToken, whenFalse) {
                return node.condition !== condition || node.questionToken !== questionToken || node.whenTrue !== whenTrue || node.colonToken !== colonToken || node.whenFalse !== whenFalse ? update(createConditionalExpression(condition, questionToken, whenTrue, colonToken, whenFalse), node) : node;
            }
            function createTemplateExpression(head, templateSpans) {
                const node = createBaseNode(225 /* TemplateExpression */);
                node.head = head;
                node.templateSpans = createNodeArray(templateSpans);
                node.transformFlags |= propagateChildFlags(node.head) | propagateChildrenFlags(node.templateSpans) | 1024 /* ContainsES2015 */;
                return node;
            }
            function updateTemplateExpression(node, head, templateSpans) {
                return node.head !== head || node.templateSpans !== templateSpans ? update(createTemplateExpression(head, templateSpans), node) : node;
            }
            function checkTemplateLiteralLikeNode(kind, text, rawText, templateFlags = 0 /* None */) {
                Debug.assert(!(templateFlags & ~2048 /* TemplateLiteralLikeFlags */), "Unsupported template flags.");
                let cooked = void 0;
                if (rawText !== void 0 && rawText !== text) {
                    cooked = getCookedText(kind, rawText);
                    if (typeof cooked === "object") {
                        return Debug.fail("Invalid raw text");
                    }
                }
                if (text === void 0) {
                    if (cooked === void 0) {
                        return Debug.fail("Arguments 'text' and 'rawText' may not both be undefined.");
                    }
                    text = cooked;
                }
                else if (cooked !== void 0) {
                    Debug.assert(text === cooked, "Expected argument 'text' to be the normalized (i.e. 'cooked') version of argument 'rawText'.");
                }
                return text;
            }
            function getTransformFlagsOfTemplateLiteralLike(templateFlags) {
                let transformFlags = 1024 /* ContainsES2015 */;
                if (templateFlags) {
                    transformFlags |= 128 /* ContainsES2018 */;
                }
                return transformFlags;
            }
            function createTemplateLiteralLikeToken(kind, text, rawText, templateFlags) {
                const node = createBaseToken(kind);
                node.text = text;
                node.rawText = rawText;
                node.templateFlags = templateFlags & 2048 /* TemplateLiteralLikeFlags */;
                node.transformFlags = getTransformFlagsOfTemplateLiteralLike(node.templateFlags);
                return node;
            }
            function createTemplateLiteralLikeDeclaration(kind, text, rawText, templateFlags) {
                const node = createBaseDeclaration(kind);
                node.text = text;
                node.rawText = rawText;
                node.templateFlags = templateFlags & 2048 /* TemplateLiteralLikeFlags */;
                node.transformFlags = getTransformFlagsOfTemplateLiteralLike(node.templateFlags);
                return node;
            }
            function createTemplateLiteralLikeNode(kind, text, rawText, templateFlags) {
                if (kind === 14 /* NoSubstitutionTemplateLiteral */) {
                    return createTemplateLiteralLikeDeclaration(kind, text, rawText, templateFlags);
                }
                return createTemplateLiteralLikeToken(kind, text, rawText, templateFlags);
            }
            function createTemplateHead(text, rawText, templateFlags) {
                text = checkTemplateLiteralLikeNode(15 /* TemplateHead */, text, rawText, templateFlags);
                return createTemplateLiteralLikeNode(15 /* TemplateHead */, text, rawText, templateFlags);
            }
            function createTemplateMiddle(text, rawText, templateFlags) {
                text = checkTemplateLiteralLikeNode(15 /* TemplateHead */, text, rawText, templateFlags);
                return createTemplateLiteralLikeNode(16 /* TemplateMiddle */, text, rawText, templateFlags);
            }
            function createTemplateTail(text, rawText, templateFlags) {
                text = checkTemplateLiteralLikeNode(15 /* TemplateHead */, text, rawText, templateFlags);
                return createTemplateLiteralLikeNode(17 /* TemplateTail */, text, rawText, templateFlags);
            }
            function createNoSubstitutionTemplateLiteral(text, rawText, templateFlags) {
                text = checkTemplateLiteralLikeNode(15 /* TemplateHead */, text, rawText, templateFlags);
                return createTemplateLiteralLikeDeclaration(14 /* NoSubstitutionTemplateLiteral */, text, rawText, templateFlags);
            }
            function createYieldExpression(asteriskToken, expression) {
                Debug.assert(!asteriskToken || !!expression, "A `YieldExpression` with an asteriskToken must have an expression.");
                const node = createBaseNode(226 /* YieldExpression */);
                node.expression = expression && parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.asteriskToken = asteriskToken;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.asteriskToken) | 1024 /* ContainsES2015 */ | 128 /* ContainsES2018 */ | 1048576 /* ContainsYield */;
                return node;
            }
            function updateYieldExpression(node, asteriskToken, expression) {
                return node.expression !== expression || node.asteriskToken !== asteriskToken ? update(createYieldExpression(asteriskToken, expression), node) : node;
            }
            function createSpreadElement(expression) {
                const node = createBaseNode(227 /* SpreadElement */);
                node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.transformFlags |= propagateChildFlags(node.expression) | 1024 /* ContainsES2015 */ | 32768 /* ContainsRestOrSpread */;
                return node;
            }
            function updateSpreadElement(node, expression) {
                return node.expression !== expression ? update(createSpreadElement(expression), node) : node;
            }
            function createClassExpression(modifiers, name, typeParameters, heritageClauses, members) {
                const node = createBaseDeclaration(228 /* ClassExpression */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.heritageClauses = asNodeArray(heritageClauses);
                node.members = createNodeArray(members);
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateNameFlags(node.name) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.heritageClauses) | propagateChildrenFlags(node.members) | (node.typeParameters ? 1 /* ContainsTypeScript */ : 0 /* None */) | 1024 /* ContainsES2015 */;
                node.jsDoc = void 0;
                return node;
            }
            function updateClassExpression(node, modifiers, name, typeParameters, heritageClauses, members) {
                return node.modifiers !== modifiers || node.name !== name || node.typeParameters !== typeParameters || node.heritageClauses !== heritageClauses || node.members !== members ? update(createClassExpression(modifiers, name, typeParameters, heritageClauses, members), node) : node;
            }
            function createOmittedExpression() {
                return createBaseNode(229 /* OmittedExpression */);
            }
            function createExpressionWithTypeArguments(expression, typeArguments) {
                const node = createBaseNode(230 /* ExpressionWithTypeArguments */);
                node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false);
                node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildrenFlags(node.typeArguments) | 1024 /* ContainsES2015 */;
                return node;
            }
            function updateExpressionWithTypeArguments(node, expression, typeArguments) {
                return node.expression !== expression || node.typeArguments !== typeArguments ? update(createExpressionWithTypeArguments(expression, typeArguments), node) : node;
            }
            function createAsExpression(expression, type) {
                const node = createBaseNode(231 /* AsExpression */);
                node.expression = expression;
                node.type = type;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.type) | 1 /* ContainsTypeScript */;
                return node;
            }
            function updateAsExpression(node, expression, type) {
                return node.expression !== expression || node.type !== type ? update(createAsExpression(expression, type), node) : node;
            }
            function createNonNullExpression(expression) {
                const node = createBaseNode(232 /* NonNullExpression */);
                node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false);
                node.transformFlags |= propagateChildFlags(node.expression) | 1 /* ContainsTypeScript */;
                return node;
            }
            function updateNonNullExpression(node, expression) {
                if (isNonNullChain(node)) {
                    return updateNonNullChain(node, expression);
                }
                return node.expression !== expression ? update(createNonNullExpression(expression), node) : node;
            }
            function createSatisfiesExpression(expression, type) {
                const node = createBaseNode(235 /* SatisfiesExpression */);
                node.expression = expression;
                node.type = type;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.type) | 1 /* ContainsTypeScript */;
                return node;
            }
            function updateSatisfiesExpression(node, expression, type) {
                return node.expression !== expression || node.type !== type ? update(createSatisfiesExpression(expression, type), node) : node;
            }
            function createNonNullChain(expression) {
                const node = createBaseNode(232 /* NonNullExpression */);
                node.flags |= 32 /* OptionalChain */;
                node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                true);
                node.transformFlags |= propagateChildFlags(node.expression) | 1 /* ContainsTypeScript */;
                return node;
            }
            function updateNonNullChain(node, expression) {
                Debug.assert(!!(node.flags & 32 /* OptionalChain */), "Cannot update a NonNullExpression using updateNonNullChain. Use updateNonNullExpression instead.");
                return node.expression !== expression ? update(createNonNullChain(expression), node) : node;
            }
            function createMetaProperty(keywordToken, name) {
                const node = createBaseNode(233 /* MetaProperty */);
                node.keywordToken = keywordToken;
                node.name = name;
                node.transformFlags |= propagateChildFlags(node.name);
                switch (keywordToken) {
                    case 103 /* NewKeyword */:
                        node.transformFlags |= 1024 /* ContainsES2015 */;
                        break;
                    case 100 /* ImportKeyword */:
                        node.transformFlags |= 4 /* ContainsESNext */;
                        break;
                    default:
                        return Debug.assertNever(keywordToken);
                }
                node.flowNode = void 0;
                return node;
            }
            function updateMetaProperty(node, name) {
                return node.name !== name ? update(createMetaProperty(node.keywordToken, name), node) : node;
            }
            function createTemplateSpan(expression, literal) {
                const node = createBaseNode(236 /* TemplateSpan */);
                node.expression = expression;
                node.literal = literal;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.literal) | 1024 /* ContainsES2015 */;
                return node;
            }
            function updateTemplateSpan(node, expression, literal) {
                return node.expression !== expression || node.literal !== literal ? update(createTemplateSpan(expression, literal), node) : node;
            }
            function createSemicolonClassElement() {
                const node = createBaseNode(237 /* SemicolonClassElement */);
                node.transformFlags |= 1024 /* ContainsES2015 */;
                return node;
            }
            function createBlock(statements, multiLine) {
                const node = createBaseNode(238 /* Block */);
                node.statements = createNodeArray(statements);
                node.multiLine = multiLine;
                node.transformFlags |= propagateChildrenFlags(node.statements);
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateBlock(node, statements) {
                return node.statements !== statements ? update(createBlock(statements, node.multiLine), node) : node;
            }
            function createVariableStatement(modifiers, declarationList) {
                const node = createBaseNode(240 /* VariableStatement */);
                node.modifiers = asNodeArray(modifiers);
                node.declarationList = isArray(declarationList) ? createVariableDeclarationList(declarationList) : declarationList;
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.declarationList);
                if (modifiersToFlags(node.modifiers) & 2 /* Ambient */) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateVariableStatement(node, modifiers, declarationList) {
                return node.modifiers !== modifiers || node.declarationList !== declarationList ? update(createVariableStatement(modifiers, declarationList), node) : node;
            }
            function createEmptyStatement() {
                const node = createBaseNode(239 /* EmptyStatement */);
                node.jsDoc = void 0;
                return node;
            }
            function createExpressionStatement(expression) {
                const node = createBaseNode(241 /* ExpressionStatement */);
                node.expression = parenthesizerRules().parenthesizeExpressionOfExpressionStatement(expression);
                node.transformFlags |= propagateChildFlags(node.expression);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateExpressionStatement(node, expression) {
                return node.expression !== expression ? update(createExpressionStatement(expression), node) : node;
            }
            function createIfStatement(expression, thenStatement, elseStatement) {
                const node = createBaseNode(242 /* IfStatement */);
                node.expression = expression;
                node.thenStatement = asEmbeddedStatement(thenStatement);
                node.elseStatement = asEmbeddedStatement(elseStatement);
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.thenStatement) | propagateChildFlags(node.elseStatement);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateIfStatement(node, expression, thenStatement, elseStatement) {
                return node.expression !== expression || node.thenStatement !== thenStatement || node.elseStatement !== elseStatement ? update(createIfStatement(expression, thenStatement, elseStatement), node) : node;
            }
            function createDoStatement(statement, expression) {
                const node = createBaseNode(243 /* DoStatement */);
                node.statement = asEmbeddedStatement(statement);
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.statement) | propagateChildFlags(node.expression);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateDoStatement(node, statement, expression) {
                return node.statement !== statement || node.expression !== expression ? update(createDoStatement(statement, expression), node) : node;
            }
            function createWhileStatement(expression, statement) {
                const node = createBaseNode(244 /* WhileStatement */);
                node.expression = expression;
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.statement);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateWhileStatement(node, expression, statement) {
                return node.expression !== expression || node.statement !== statement ? update(createWhileStatement(expression, statement), node) : node;
            }
            function createForStatement(initializer, condition, incrementor, statement) {
                const node = createBaseNode(245 /* ForStatement */);
                node.initializer = initializer;
                node.condition = condition;
                node.incrementor = incrementor;
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.initializer) | propagateChildFlags(node.condition) | propagateChildFlags(node.incrementor) | propagateChildFlags(node.statement);
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateForStatement(node, initializer, condition, incrementor, statement) {
                return node.initializer !== initializer || node.condition !== condition || node.incrementor !== incrementor || node.statement !== statement ? update(createForStatement(initializer, condition, incrementor, statement), node) : node;
            }
            function createForInStatement(initializer, expression, statement) {
                const node = createBaseNode(246 /* ForInStatement */);
                node.initializer = initializer;
                node.expression = expression;
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.initializer) | propagateChildFlags(node.expression) | propagateChildFlags(node.statement);
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateForInStatement(node, initializer, expression, statement) {
                return node.initializer !== initializer || node.expression !== expression || node.statement !== statement ? update(createForInStatement(initializer, expression, statement), node) : node;
            }
            function createForOfStatement(awaitModifier, initializer, expression, statement) {
                const node = createBaseNode(247 /* ForOfStatement */);
                node.awaitModifier = awaitModifier;
                node.initializer = initializer;
                node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.awaitModifier) | propagateChildFlags(node.initializer) | propagateChildFlags(node.expression) | propagateChildFlags(node.statement) | 1024 /* ContainsES2015 */;
                if (awaitModifier)
                    node.transformFlags |= 128 /* ContainsES2018 */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateForOfStatement(node, awaitModifier, initializer, expression, statement) {
                return node.awaitModifier !== awaitModifier || node.initializer !== initializer || node.expression !== expression || node.statement !== statement ? update(createForOfStatement(awaitModifier, initializer, expression, statement), node) : node;
            }
            function createContinueStatement(label) {
                const node = createBaseNode(248 /* ContinueStatement */);
                node.label = asName(label);
                node.transformFlags |= propagateChildFlags(node.label) | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateContinueStatement(node, label) {
                return node.label !== label ? update(createContinueStatement(label), node) : node;
            }
            function createBreakStatement(label) {
                const node = createBaseNode(249 /* BreakStatement */);
                node.label = asName(label);
                node.transformFlags |= propagateChildFlags(node.label) | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateBreakStatement(node, label) {
                return node.label !== label ? update(createBreakStatement(label), node) : node;
            }
            function createReturnStatement(expression) {
                const node = createBaseNode(250 /* ReturnStatement */);
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.expression) | 128 /* ContainsES2018 */ | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateReturnStatement(node, expression) {
                return node.expression !== expression ? update(createReturnStatement(expression), node) : node;
            }
            function createWithStatement(expression, statement) {
                const node = createBaseNode(251 /* WithStatement */);
                node.expression = expression;
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.statement);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateWithStatement(node, expression, statement) {
                return node.expression !== expression || node.statement !== statement ? update(createWithStatement(expression, statement), node) : node;
            }
            function createSwitchStatement(expression, caseBlock) {
                const node = createBaseNode(252 /* SwitchStatement */);
                node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.caseBlock = caseBlock;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.caseBlock);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                node.possiblyExhaustive = false;
                return node;
            }
            function updateSwitchStatement(node, expression, caseBlock) {
                return node.expression !== expression || node.caseBlock !== caseBlock ? update(createSwitchStatement(expression, caseBlock), node) : node;
            }
            function createLabeledStatement(label, statement) {
                const node = createBaseNode(253 /* LabeledStatement */);
                node.label = asName(label);
                node.statement = asEmbeddedStatement(statement);
                node.transformFlags |= propagateChildFlags(node.label) | propagateChildFlags(node.statement);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateLabeledStatement(node, label, statement) {
                return node.label !== label || node.statement !== statement ? update(createLabeledStatement(label, statement), node) : node;
            }
            function createThrowStatement(expression) {
                const node = createBaseNode(254 /* ThrowStatement */);
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.expression);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateThrowStatement(node, expression) {
                return node.expression !== expression ? update(createThrowStatement(expression), node) : node;
            }
            function createTryStatement(tryBlock, catchClause, finallyBlock) {
                const node = createBaseNode(255 /* TryStatement */);
                node.tryBlock = tryBlock;
                node.catchClause = catchClause;
                node.finallyBlock = finallyBlock;
                node.transformFlags |= propagateChildFlags(node.tryBlock) | propagateChildFlags(node.catchClause) | propagateChildFlags(node.finallyBlock);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function updateTryStatement(node, tryBlock, catchClause, finallyBlock) {
                return node.tryBlock !== tryBlock || node.catchClause !== catchClause || node.finallyBlock !== finallyBlock ? update(createTryStatement(tryBlock, catchClause, finallyBlock), node) : node;
            }
            function createDebuggerStatement() {
                const node = createBaseNode(256 /* DebuggerStatement */);
                node.jsDoc = void 0;
                node.flowNode = void 0;
                return node;
            }
            function createVariableDeclaration(name, exclamationToken, type, initializer) {
                var _a2;
                const node = createBaseDeclaration(257 /* VariableDeclaration */);
                node.name = asName(name);
                node.exclamationToken = exclamationToken;
                node.type = type;
                node.initializer = asInitializer(initializer);
                node.transformFlags |= propagateNameFlags(node.name) | propagateChildFlags(node.initializer) | (((_a2 = node.exclamationToken) != null ? _a2 : node.type) ? 1 /* ContainsTypeScript */ : 0 /* None */);
                node.jsDoc = void 0;
                return node;
            }
            function updateVariableDeclaration(node, name, exclamationToken, type, initializer) {
                return node.name !== name || node.type !== type || node.exclamationToken !== exclamationToken || node.initializer !== initializer ? update(createVariableDeclaration(name, exclamationToken, type, initializer), node) : node;
            }
            function createVariableDeclarationList(declarations, flags2 = 0 /* None */) {
                const node = createBaseNode(258 /* VariableDeclarationList */);
                node.flags |= flags2 & 3 /* BlockScoped */;
                node.declarations = createNodeArray(declarations);
                node.transformFlags |= propagateChildrenFlags(node.declarations) | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                if (flags2 & 3 /* BlockScoped */) {
                    node.transformFlags |= 1024 /* ContainsES2015 */ | 262144 /* ContainsBlockScopedBinding */;
                }
                return node;
            }
            function updateVariableDeclarationList(node, declarations) {
                return node.declarations !== declarations ? update(createVariableDeclarationList(declarations, node.flags), node) : node;
            }
            function createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body) {
                const node = createBaseDeclaration(259 /* FunctionDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.asteriskToken = asteriskToken;
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = createNodeArray(parameters);
                node.type = type;
                node.body = body;
                if (!node.body || modifiersToFlags(node.modifiers) & 2 /* Ambient */) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    const isAsync = modifiersToFlags(node.modifiers) & 512 /* Async */;
                    const isGenerator = !!node.asteriskToken;
                    const isAsyncGenerator = isAsync && isGenerator;
                    node.transformFlags = propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.asteriskToken) | propagateNameFlags(node.name) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.parameters) | propagateChildFlags(node.type) | propagateChildFlags(node.body) & ~67108864 /* ContainsPossibleTopLevelAwait */ | (isAsyncGenerator ? 128 /* ContainsES2018 */ : isAsync ? 256 /* ContainsES2017 */ : isGenerator ? 2048 /* ContainsGenerator */ : 0 /* None */) | (node.typeParameters || node.type ? 1 /* ContainsTypeScript */ : 0 /* None */) | 4194304 /* ContainsHoistedDeclarationOrCompletion */;
                }
                node.typeArguments = void 0;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.endFlowNode = void 0;
                node.returnFlowNode = void 0;
                return node;
            }
            function updateFunctionDeclaration(node, modifiers, asteriskToken, name, typeParameters, parameters, type, body) {
                return node.modifiers !== modifiers || node.asteriskToken !== asteriskToken || node.name !== name || node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type || node.body !== body ? finishUpdateFunctionDeclaration(createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body), node) : node;
            }
            function finishUpdateFunctionDeclaration(updated, original) {
                if (updated !== original) {
                    if (updated.modifiers === original.modifiers) {
                        updated.modifiers = original.modifiers;
                    }
                }
                return finishUpdateBaseSignatureDeclaration(updated, original);
            }
            function createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members) {
                const node = createBaseDeclaration(260 /* ClassDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.heritageClauses = asNodeArray(heritageClauses);
                node.members = createNodeArray(members);
                if (modifiersToFlags(node.modifiers) & 2 /* Ambient */) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateNameFlags(node.name) | propagateChildrenFlags(node.typeParameters) | propagateChildrenFlags(node.heritageClauses) | propagateChildrenFlags(node.members) | (node.typeParameters ? 1 /* ContainsTypeScript */ : 0 /* None */) | 1024 /* ContainsES2015 */;
                    if (node.transformFlags & 8192 /* ContainsTypeScriptClassSyntax */) {
                        node.transformFlags |= 1 /* ContainsTypeScript */;
                    }
                }
                node.jsDoc = void 0;
                return node;
            }
            function updateClassDeclaration(node, modifiers, name, typeParameters, heritageClauses, members) {
                return node.modifiers !== modifiers || node.name !== name || node.typeParameters !== typeParameters || node.heritageClauses !== heritageClauses || node.members !== members ? update(createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members), node) : node;
            }
            function createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members) {
                const node = createBaseDeclaration(261 /* InterfaceDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.heritageClauses = asNodeArray(heritageClauses);
                node.members = createNodeArray(members);
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                return node;
            }
            function updateInterfaceDeclaration(node, modifiers, name, typeParameters, heritageClauses, members) {
                return node.modifiers !== modifiers || node.name !== name || node.typeParameters !== typeParameters || node.heritageClauses !== heritageClauses || node.members !== members ? update(createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members), node) : node;
            }
            function createTypeAliasDeclaration(modifiers, name, typeParameters, type) {
                const node = createBaseDeclaration(262 /* TypeAliasDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.typeParameters = asNodeArray(typeParameters);
                node.type = type;
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateTypeAliasDeclaration(node, modifiers, name, typeParameters, type) {
                return node.modifiers !== modifiers || node.name !== name || node.typeParameters !== typeParameters || node.type !== type ? update(createTypeAliasDeclaration(modifiers, name, typeParameters, type), node) : node;
            }
            function createEnumDeclaration(modifiers, name, members) {
                const node = createBaseDeclaration(263 /* EnumDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.members = createNodeArray(members);
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.name) | propagateChildrenFlags(node.members) | 1 /* ContainsTypeScript */;
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }
            function updateEnumDeclaration(node, modifiers, name, members) {
                return node.modifiers !== modifiers || node.name !== name || node.members !== members ? update(createEnumDeclaration(modifiers, name, members), node) : node;
            }
            function createModuleDeclaration(modifiers, name, body, flags2 = 0 /* None */) {
                const node = createBaseDeclaration(264 /* ModuleDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.flags |= flags2 & (16 /* Namespace */ | 4 /* NestedNamespace */ | 1024 /* GlobalAugmentation */);
                node.name = name;
                node.body = body;
                if (modifiersToFlags(node.modifiers) & 2 /* Ambient */) {
                    node.transformFlags = 1 /* ContainsTypeScript */;
                }
                else {
                    node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.name) | propagateChildFlags(node.body) | 1 /* ContainsTypeScript */;
                }
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateModuleDeclaration(node, modifiers, name, body) {
                return node.modifiers !== modifiers || node.name !== name || node.body !== body ? update(createModuleDeclaration(modifiers, name, body, node.flags), node) : node;
            }
            function createModuleBlock(statements) {
                const node = createBaseNode(265 /* ModuleBlock */);
                node.statements = createNodeArray(statements);
                node.transformFlags |= propagateChildrenFlags(node.statements);
                node.jsDoc = void 0;
                return node;
            }
            function updateModuleBlock(node, statements) {
                return node.statements !== statements ? update(createModuleBlock(statements), node) : node;
            }
            function createCaseBlock(clauses) {
                const node = createBaseNode(266 /* CaseBlock */);
                node.clauses = createNodeArray(clauses);
                node.transformFlags |= propagateChildrenFlags(node.clauses);
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateCaseBlock(node, clauses) {
                return node.clauses !== clauses ? update(createCaseBlock(clauses), node) : node;
            }
            function createNamespaceExportDeclaration(name) {
                const node = createBaseDeclaration(267 /* NamespaceExportDeclaration */);
                node.name = asName(name);
                node.transformFlags |= propagateIdentifierNameFlags(node.name) | 1 /* ContainsTypeScript */;
                node.modifiers = void 0;
                node.jsDoc = void 0;
                return node;
            }
            function updateNamespaceExportDeclaration(node, name) {
                return node.name !== name ? finishUpdateNamespaceExportDeclaration(createNamespaceExportDeclaration(name), node) : node;
            }
            function finishUpdateNamespaceExportDeclaration(updated, original) {
                if (updated !== original) {
                    updated.modifiers = original.modifiers;
                }
                return update(updated, original);
            }
            function createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference) {
                const node = createBaseDeclaration(268 /* ImportEqualsDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.name = asName(name);
                node.isTypeOnly = isTypeOnly;
                node.moduleReference = moduleReference;
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateIdentifierNameFlags(node.name) | propagateChildFlags(node.moduleReference);
                if (!isExternalModuleReference(node.moduleReference)) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }
            function updateImportEqualsDeclaration(node, modifiers, isTypeOnly, name, moduleReference) {
                return node.modifiers !== modifiers || node.isTypeOnly !== isTypeOnly || node.name !== name || node.moduleReference !== moduleReference ? update(createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference), node) : node;
            }
            function createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause) {
                const node = createBaseNode(269 /* ImportDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.importClause = importClause;
                node.moduleSpecifier = moduleSpecifier;
                node.assertClause = assertClause;
                node.transformFlags |= propagateChildFlags(node.importClause) | propagateChildFlags(node.moduleSpecifier);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }
            function updateImportDeclaration(node, modifiers, importClause, moduleSpecifier, assertClause) {
                return node.modifiers !== modifiers || node.importClause !== importClause || node.moduleSpecifier !== moduleSpecifier || node.assertClause !== assertClause ? update(createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause), node) : node;
            }
            function createImportClause(isTypeOnly, name, namedBindings) {
                const node = createBaseDeclaration(270 /* ImportClause */);
                node.isTypeOnly = isTypeOnly;
                node.name = name;
                node.namedBindings = namedBindings;
                node.transformFlags |= propagateChildFlags(node.name) | propagateChildFlags(node.namedBindings);
                if (isTypeOnly) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }
            function updateImportClause(node, isTypeOnly, name, namedBindings) {
                return node.isTypeOnly !== isTypeOnly || node.name !== name || node.namedBindings !== namedBindings ? update(createImportClause(isTypeOnly, name, namedBindings), node) : node;
            }
            function createAssertClause(elements, multiLine) {
                const node = createBaseNode(296 /* AssertClause */);
                node.elements = createNodeArray(elements);
                node.multiLine = multiLine;
                node.transformFlags |= 4 /* ContainsESNext */;
                return node;
            }
            function updateAssertClause(node, elements, multiLine) {
                return node.elements !== elements || node.multiLine !== multiLine ? update(createAssertClause(elements, multiLine), node) : node;
            }
            function createAssertEntry(name, value) {
                const node = createBaseNode(297 /* AssertEntry */);
                node.name = name;
                node.value = value;
                node.transformFlags |= 4 /* ContainsESNext */;
                return node;
            }
            function updateAssertEntry(node, name, value) {
                return node.name !== name || node.value !== value ? update(createAssertEntry(name, value), node) : node;
            }
            function createImportTypeAssertionContainer(clause, multiLine) {
                const node = createBaseNode(298 /* ImportTypeAssertionContainer */);
                node.assertClause = clause;
                node.multiLine = multiLine;
                return node;
            }
            function updateImportTypeAssertionContainer(node, clause, multiLine) {
                return node.assertClause !== clause || node.multiLine !== multiLine ? update(createImportTypeAssertionContainer(clause, multiLine), node) : node;
            }
            function createNamespaceImport(name) {
                const node = createBaseDeclaration(271 /* NamespaceImport */);
                node.name = name;
                node.transformFlags |= propagateChildFlags(node.name);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }
            function updateNamespaceImport(node, name) {
                return node.name !== name ? update(createNamespaceImport(name), node) : node;
            }
            function createNamespaceExport(name) {
                const node = createBaseDeclaration(277 /* NamespaceExport */);
                node.name = name;
                node.transformFlags |= propagateChildFlags(node.name) | 4 /* ContainsESNext */;
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }
            function updateNamespaceExport(node, name) {
                return node.name !== name ? update(createNamespaceExport(name), node) : node;
            }
            function createNamedImports(elements) {
                const node = createBaseNode(272 /* NamedImports */);
                node.elements = createNodeArray(elements);
                node.transformFlags |= propagateChildrenFlags(node.elements);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }
            function updateNamedImports(node, elements) {
                return node.elements !== elements ? update(createNamedImports(elements), node) : node;
            }
            function createImportSpecifier(isTypeOnly, propertyName, name) {
                const node = createBaseDeclaration(273 /* ImportSpecifier */);
                node.isTypeOnly = isTypeOnly;
                node.propertyName = propertyName;
                node.name = name;
                node.transformFlags |= propagateChildFlags(node.propertyName) | propagateChildFlags(node.name);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }
            function updateImportSpecifier(node, isTypeOnly, propertyName, name) {
                return node.isTypeOnly !== isTypeOnly || node.propertyName !== propertyName || node.name !== name ? update(createImportSpecifier(isTypeOnly, propertyName, name), node) : node;
            }
            function createExportAssignment2(modifiers, isExportEquals, expression) {
                const node = createBaseDeclaration(274 /* ExportAssignment */);
                node.modifiers = asNodeArray(modifiers);
                node.isExportEquals = isExportEquals;
                node.expression = isExportEquals ? parenthesizerRules().parenthesizeRightSideOfBinary(63 /* EqualsToken */, 
                /*leftSide*/
                void 0, expression) : parenthesizerRules().parenthesizeExpressionOfExportDefault(expression);
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.expression);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }
            function updateExportAssignment(node, modifiers, expression) {
                return node.modifiers !== modifiers || node.expression !== expression ? update(createExportAssignment2(modifiers, node.isExportEquals, expression), node) : node;
            }
            function createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause) {
                const node = createBaseDeclaration(275 /* ExportDeclaration */);
                node.modifiers = asNodeArray(modifiers);
                node.isTypeOnly = isTypeOnly;
                node.exportClause = exportClause;
                node.moduleSpecifier = moduleSpecifier;
                node.assertClause = assertClause;
                node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.exportClause) | propagateChildFlags(node.moduleSpecifier);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }
            function updateExportDeclaration(node, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause) {
                return node.modifiers !== modifiers || node.isTypeOnly !== isTypeOnly || node.exportClause !== exportClause || node.moduleSpecifier !== moduleSpecifier || node.assertClause !== assertClause ? finishUpdateExportDeclaration(createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause), node) : node;
            }
            function finishUpdateExportDeclaration(updated, original) {
                if (updated !== original) {
                    if (updated.modifiers === original.modifiers) {
                        updated.modifiers = original.modifiers;
                    }
                }
                return update(updated, original);
            }
            function createNamedExports(elements) {
                const node = createBaseNode(276 /* NamedExports */);
                node.elements = createNodeArray(elements);
                node.transformFlags |= propagateChildrenFlags(node.elements);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }
            function updateNamedExports(node, elements) {
                return node.elements !== elements ? update(createNamedExports(elements), node) : node;
            }
            function createExportSpecifier(isTypeOnly, propertyName, name) {
                const node = createBaseNode(278 /* ExportSpecifier */);
                node.isTypeOnly = isTypeOnly;
                node.propertyName = asName(propertyName);
                node.name = asName(name);
                node.transformFlags |= propagateChildFlags(node.propertyName) | propagateChildFlags(node.name);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }
            function updateExportSpecifier(node, isTypeOnly, propertyName, name) {
                return node.isTypeOnly !== isTypeOnly || node.propertyName !== propertyName || node.name !== name ? update(createExportSpecifier(isTypeOnly, propertyName, name), node) : node;
            }
            function createMissingDeclaration() {
                const node = createBaseDeclaration(279 /* MissingDeclaration */);
                node.jsDoc = void 0;
                return node;
            }
            function createExternalModuleReference(expression) {
                const node = createBaseNode(280 /* ExternalModuleReference */);
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.expression);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                return node;
            }
            function updateExternalModuleReference(node, expression) {
                return node.expression !== expression ? update(createExternalModuleReference(expression), node) : node;
            }
            function createJSDocPrimaryTypeWorker(kind) {
                return createBaseNode(kind);
            }
            function createJSDocPrePostfixUnaryTypeWorker(kind, type, postfix = false) {
                const node = createJSDocUnaryTypeWorker(kind, postfix ? type && parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(type) : type);
                node.postfix = postfix;
                return node;
            }
            function createJSDocUnaryTypeWorker(kind, type) {
                const node = createBaseNode(kind);
                node.type = type;
                return node;
            }
            function updateJSDocPrePostfixUnaryTypeWorker(kind, node, type) {
                return node.type !== type ? update(createJSDocPrePostfixUnaryTypeWorker(kind, type, node.postfix), node) : node;
            }
            function updateJSDocUnaryTypeWorker(kind, node, type) {
                return node.type !== type ? update(createJSDocUnaryTypeWorker(kind, type), node) : node;
            }
            function createJSDocFunctionType(parameters, type) {
                const node = createBaseDeclaration(320 /* JSDocFunctionType */);
                node.parameters = asNodeArray(parameters);
                node.type = type;
                node.transformFlags = propagateChildrenFlags(node.parameters) | (node.type ? 1 /* ContainsTypeScript */ : 0 /* None */);
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                node.typeArguments = void 0;
                return node;
            }
            function updateJSDocFunctionType(node, parameters, type) {
                return node.parameters !== parameters || node.type !== type ? update(createJSDocFunctionType(parameters, type), node) : node;
            }
            function createJSDocTypeLiteral(propertyTags, isArrayType = false) {
                const node = createBaseDeclaration(325 /* JSDocTypeLiteral */);
                node.jsDocPropertyTags = asNodeArray(propertyTags);
                node.isArrayType = isArrayType;
                return node;
            }
            function updateJSDocTypeLiteral(node, propertyTags, isArrayType) {
                return node.jsDocPropertyTags !== propertyTags || node.isArrayType !== isArrayType ? update(createJSDocTypeLiteral(propertyTags, isArrayType), node) : node;
            }
            function createJSDocTypeExpression(type) {
                const node = createBaseNode(312 /* JSDocTypeExpression */);
                node.type = type;
                return node;
            }
            function updateJSDocTypeExpression(node, type) {
                return node.type !== type ? update(createJSDocTypeExpression(type), node) : node;
            }
            function createJSDocSignature(typeParameters, parameters, type) {
                const node = createBaseDeclaration(326 /* JSDocSignature */);
                node.typeParameters = asNodeArray(typeParameters);
                node.parameters = createNodeArray(parameters);
                node.type = type;
                node.jsDoc = void 0;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateJSDocSignature(node, typeParameters, parameters, type) {
                return node.typeParameters !== typeParameters || node.parameters !== parameters || node.type !== type ? update(createJSDocSignature(typeParameters, parameters, type), node) : node;
            }
            function getDefaultTagName(node) {
                const defaultTagName = getDefaultTagNameForKind(node.kind);
                return node.tagName.escapedText === escapeLeadingUnderscores(defaultTagName) ? node.tagName : createIdentifier(defaultTagName);
            }
            function createBaseJSDocTag(kind, tagName, comment) {
                const node = createBaseNode(kind);
                node.tagName = tagName;
                node.comment = comment;
                return node;
            }
            function createBaseJSDocTagDeclaration(kind, tagName, comment) {
                const node = createBaseDeclaration(kind);
                node.tagName = tagName;
                node.comment = comment;
                return node;
            }
            function createJSDocTemplateTag(tagName, constraint, typeParameters, comment) {
                const node = createBaseJSDocTag(348 /* JSDocTemplateTag */, tagName != null ? tagName : createIdentifier("template"), comment);
                node.constraint = constraint;
                node.typeParameters = createNodeArray(typeParameters);
                return node;
            }
            function updateJSDocTemplateTag(node, tagName = getDefaultTagName(node), constraint, typeParameters, comment) {
                return node.tagName !== tagName || node.constraint !== constraint || node.typeParameters !== typeParameters || node.comment !== comment ? update(createJSDocTemplateTag(tagName, constraint, typeParameters, comment), node) : node;
            }
            function createJSDocTypedefTag(tagName, typeExpression, fullName, comment) {
                const node = createBaseJSDocTagDeclaration(349 /* JSDocTypedefTag */, tagName != null ? tagName : createIdentifier("typedef"), comment);
                node.typeExpression = typeExpression;
                node.fullName = fullName;
                node.name = getJSDocTypeAliasName(fullName);
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateJSDocTypedefTag(node, tagName = getDefaultTagName(node), typeExpression, fullName, comment) {
                return node.tagName !== tagName || node.typeExpression !== typeExpression || node.fullName !== fullName || node.comment !== comment ? update(createJSDocTypedefTag(tagName, typeExpression, fullName, comment), node) : node;
            }
            function createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment) {
                const node = createBaseJSDocTagDeclaration(344 /* JSDocParameterTag */, tagName != null ? tagName : createIdentifier("param"), comment);
                node.typeExpression = typeExpression;
                node.name = name;
                node.isNameFirst = !!isNameFirst;
                node.isBracketed = isBracketed;
                return node;
            }
            function updateJSDocParameterTag(node, tagName = getDefaultTagName(node), name, isBracketed, typeExpression, isNameFirst, comment) {
                return node.tagName !== tagName || node.name !== name || node.isBracketed !== isBracketed || node.typeExpression !== typeExpression || node.isNameFirst !== isNameFirst || node.comment !== comment ? update(createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment), node) : node;
            }
            function createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment) {
                const node = createBaseJSDocTagDeclaration(351 /* JSDocPropertyTag */, tagName != null ? tagName : createIdentifier("prop"), comment);
                node.typeExpression = typeExpression;
                node.name = name;
                node.isNameFirst = !!isNameFirst;
                node.isBracketed = isBracketed;
                return node;
            }
            function updateJSDocPropertyTag(node, tagName = getDefaultTagName(node), name, isBracketed, typeExpression, isNameFirst, comment) {
                return node.tagName !== tagName || node.name !== name || node.isBracketed !== isBracketed || node.typeExpression !== typeExpression || node.isNameFirst !== isNameFirst || node.comment !== comment ? update(createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment), node) : node;
            }
            function createJSDocCallbackTag(tagName, typeExpression, fullName, comment) {
                const node = createBaseJSDocTagDeclaration(341 /* JSDocCallbackTag */, tagName != null ? tagName : createIdentifier("callback"), comment);
                node.typeExpression = typeExpression;
                node.fullName = fullName;
                node.name = getJSDocTypeAliasName(fullName);
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateJSDocCallbackTag(node, tagName = getDefaultTagName(node), typeExpression, fullName, comment) {
                return node.tagName !== tagName || node.typeExpression !== typeExpression || node.fullName !== fullName || node.comment !== comment ? update(createJSDocCallbackTag(tagName, typeExpression, fullName, comment), node) : node;
            }
            function createJSDocOverloadTag(tagName, typeExpression, comment) {
                const node = createBaseJSDocTag(342 /* JSDocOverloadTag */, tagName != null ? tagName : createIdentifier("overload"), comment);
                node.typeExpression = typeExpression;
                return node;
            }
            function updateJSDocOverloadTag(node, tagName = getDefaultTagName(node), typeExpression, comment) {
                return node.tagName !== tagName || node.typeExpression !== typeExpression || node.comment !== comment ? update(createJSDocOverloadTag(tagName, typeExpression, comment), node) : node;
            }
            function createJSDocAugmentsTag(tagName, className, comment) {
                const node = createBaseJSDocTag(331 /* JSDocAugmentsTag */, tagName != null ? tagName : createIdentifier("augments"), comment);
                node.class = className;
                return node;
            }
            function updateJSDocAugmentsTag(node, tagName = getDefaultTagName(node), className, comment) {
                return node.tagName !== tagName || node.class !== className || node.comment !== comment ? update(createJSDocAugmentsTag(tagName, className, comment), node) : node;
            }
            function createJSDocImplementsTag(tagName, className, comment) {
                const node = createBaseJSDocTag(332 /* JSDocImplementsTag */, tagName != null ? tagName : createIdentifier("implements"), comment);
                node.class = className;
                return node;
            }
            function createJSDocSeeTag(tagName, name, comment) {
                const node = createBaseJSDocTag(350 /* JSDocSeeTag */, tagName != null ? tagName : createIdentifier("see"), comment);
                node.name = name;
                return node;
            }
            function updateJSDocSeeTag(node, tagName, name, comment) {
                return node.tagName !== tagName || node.name !== name || node.comment !== comment ? update(createJSDocSeeTag(tagName, name, comment), node) : node;
            }
            function createJSDocNameReference(name) {
                const node = createBaseNode(313 /* JSDocNameReference */);
                node.name = name;
                return node;
            }
            function updateJSDocNameReference(node, name) {
                return node.name !== name ? update(createJSDocNameReference(name), node) : node;
            }
            function createJSDocMemberName(left, right) {
                const node = createBaseNode(314 /* JSDocMemberName */);
                node.left = left;
                node.right = right;
                node.transformFlags |= propagateChildFlags(node.left) | propagateChildFlags(node.right);
                return node;
            }
            function updateJSDocMemberName(node, left, right) {
                return node.left !== left || node.right !== right ? update(createJSDocMemberName(left, right), node) : node;
            }
            function createJSDocLink(name, text) {
                const node = createBaseNode(327 /* JSDocLink */);
                node.name = name;
                node.text = text;
                return node;
            }
            function updateJSDocLink(node, name, text) {
                return node.name !== name ? update(createJSDocLink(name, text), node) : node;
            }
            function createJSDocLinkCode(name, text) {
                const node = createBaseNode(328 /* JSDocLinkCode */);
                node.name = name;
                node.text = text;
                return node;
            }
            function updateJSDocLinkCode(node, name, text) {
                return node.name !== name ? update(createJSDocLinkCode(name, text), node) : node;
            }
            function createJSDocLinkPlain(name, text) {
                const node = createBaseNode(329 /* JSDocLinkPlain */);
                node.name = name;
                node.text = text;
                return node;
            }
            function updateJSDocLinkPlain(node, name, text) {
                return node.name !== name ? update(createJSDocLinkPlain(name, text), node) : node;
            }
            function updateJSDocImplementsTag(node, tagName = getDefaultTagName(node), className, comment) {
                return node.tagName !== tagName || node.class !== className || node.comment !== comment ? update(createJSDocImplementsTag(tagName, className, comment), node) : node;
            }
            function createJSDocSimpleTagWorker(kind, tagName, comment) {
                const node = createBaseJSDocTag(kind, tagName != null ? tagName : createIdentifier(getDefaultTagNameForKind(kind)), comment);
                return node;
            }
            function updateJSDocSimpleTagWorker(kind, node, tagName = getDefaultTagName(node), comment) {
                return node.tagName !== tagName || node.comment !== comment ? update(createJSDocSimpleTagWorker(kind, tagName, comment), node) : node;
            }
            function createJSDocTypeLikeTagWorker(kind, tagName, typeExpression, comment) {
                const node = createBaseJSDocTag(kind, tagName != null ? tagName : createIdentifier(getDefaultTagNameForKind(kind)), comment);
                node.typeExpression = typeExpression;
                return node;
            }
            function updateJSDocTypeLikeTagWorker(kind, node, tagName = getDefaultTagName(node), typeExpression, comment) {
                return node.tagName !== tagName || node.typeExpression !== typeExpression || node.comment !== comment ? update(createJSDocTypeLikeTagWorker(kind, tagName, typeExpression, comment), node) : node;
            }
            function createJSDocUnknownTag(tagName, comment) {
                const node = createBaseJSDocTag(330 /* JSDocTag */, tagName, comment);
                return node;
            }
            function updateJSDocUnknownTag(node, tagName, comment) {
                return node.tagName !== tagName || node.comment !== comment ? update(createJSDocUnknownTag(tagName, comment), node) : node;
            }
            function createJSDocEnumTag(tagName, typeExpression, comment) {
                const node = createBaseJSDocTagDeclaration(343 /* JSDocEnumTag */, tagName != null ? tagName : createIdentifier(getDefaultTagNameForKind(343 /* JSDocEnumTag */)), comment);
                node.typeExpression = typeExpression;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateJSDocEnumTag(node, tagName = getDefaultTagName(node), typeExpression, comment) {
                return node.tagName !== tagName || node.typeExpression !== typeExpression || node.comment !== comment ? update(createJSDocEnumTag(tagName, typeExpression, comment), node) : node;
            }
            function createJSDocText(text) {
                const node = createBaseNode(324 /* JSDocText */);
                node.text = text;
                return node;
            }
            function updateJSDocText(node, text) {
                return node.text !== text ? update(createJSDocText(text), node) : node;
            }
            function createJSDocComment(comment, tags) {
                const node = createBaseNode(323 /* JSDoc */);
                node.comment = comment;
                node.tags = asNodeArray(tags);
                return node;
            }
            function updateJSDocComment(node, comment, tags) {
                return node.comment !== comment || node.tags !== tags ? update(createJSDocComment(comment, tags), node) : node;
            }
            function createJsxElement(openingElement, children, closingElement) {
                const node = createBaseNode(281 /* JsxElement */);
                node.openingElement = openingElement;
                node.children = createNodeArray(children);
                node.closingElement = closingElement;
                node.transformFlags |= propagateChildFlags(node.openingElement) | propagateChildrenFlags(node.children) | propagateChildFlags(node.closingElement) | 2 /* ContainsJsx */;
                return node;
            }
            function updateJsxElement(node, openingElement, children, closingElement) {
                return node.openingElement !== openingElement || node.children !== children || node.closingElement !== closingElement ? update(createJsxElement(openingElement, children, closingElement), node) : node;
            }
            function createJsxSelfClosingElement(tagName, typeArguments, attributes) {
                const node = createBaseNode(282 /* JsxSelfClosingElement */);
                node.tagName = tagName;
                node.typeArguments = asNodeArray(typeArguments);
                node.attributes = attributes;
                node.transformFlags |= propagateChildFlags(node.tagName) | propagateChildrenFlags(node.typeArguments) | propagateChildFlags(node.attributes) | 2 /* ContainsJsx */;
                if (node.typeArguments) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                return node;
            }
            function updateJsxSelfClosingElement(node, tagName, typeArguments, attributes) {
                return node.tagName !== tagName || node.typeArguments !== typeArguments || node.attributes !== attributes ? update(createJsxSelfClosingElement(tagName, typeArguments, attributes), node) : node;
            }
            function createJsxOpeningElement(tagName, typeArguments, attributes) {
                const node = createBaseNode(283 /* JsxOpeningElement */);
                node.tagName = tagName;
                node.typeArguments = asNodeArray(typeArguments);
                node.attributes = attributes;
                node.transformFlags |= propagateChildFlags(node.tagName) | propagateChildrenFlags(node.typeArguments) | propagateChildFlags(node.attributes) | 2 /* ContainsJsx */;
                if (typeArguments) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                return node;
            }
            function updateJsxOpeningElement(node, tagName, typeArguments, attributes) {
                return node.tagName !== tagName || node.typeArguments !== typeArguments || node.attributes !== attributes ? update(createJsxOpeningElement(tagName, typeArguments, attributes), node) : node;
            }
            function createJsxClosingElement(tagName) {
                const node = createBaseNode(284 /* JsxClosingElement */);
                node.tagName = tagName;
                node.transformFlags |= propagateChildFlags(node.tagName) | 2 /* ContainsJsx */;
                return node;
            }
            function updateJsxClosingElement(node, tagName) {
                return node.tagName !== tagName ? update(createJsxClosingElement(tagName), node) : node;
            }
            function createJsxFragment(openingFragment, children, closingFragment) {
                const node = createBaseNode(285 /* JsxFragment */);
                node.openingFragment = openingFragment;
                node.children = createNodeArray(children);
                node.closingFragment = closingFragment;
                node.transformFlags |= propagateChildFlags(node.openingFragment) | propagateChildrenFlags(node.children) | propagateChildFlags(node.closingFragment) | 2 /* ContainsJsx */;
                return node;
            }
            function updateJsxFragment(node, openingFragment, children, closingFragment) {
                return node.openingFragment !== openingFragment || node.children !== children || node.closingFragment !== closingFragment ? update(createJsxFragment(openingFragment, children, closingFragment), node) : node;
            }
            function createJsxText(text, containsOnlyTriviaWhiteSpaces) {
                const node = createBaseNode(11 /* JsxText */);
                node.text = text;
                node.containsOnlyTriviaWhiteSpaces = !!containsOnlyTriviaWhiteSpaces;
                node.transformFlags |= 2 /* ContainsJsx */;
                return node;
            }
            function updateJsxText(node, text, containsOnlyTriviaWhiteSpaces) {
                return node.text !== text || node.containsOnlyTriviaWhiteSpaces !== containsOnlyTriviaWhiteSpaces ? update(createJsxText(text, containsOnlyTriviaWhiteSpaces), node) : node;
            }
            function createJsxOpeningFragment() {
                const node = createBaseNode(286 /* JsxOpeningFragment */);
                node.transformFlags |= 2 /* ContainsJsx */;
                return node;
            }
            function createJsxJsxClosingFragment() {
                const node = createBaseNode(287 /* JsxClosingFragment */);
                node.transformFlags |= 2 /* ContainsJsx */;
                return node;
            }
            function createJsxAttribute(name, initializer) {
                const node = createBaseDeclaration(288 /* JsxAttribute */);
                node.name = name;
                node.initializer = initializer;
                node.transformFlags |= propagateChildFlags(node.name) | propagateChildFlags(node.initializer) | 2 /* ContainsJsx */;
                return node;
            }
            function updateJsxAttribute(node, name, initializer) {
                return node.name !== name || node.initializer !== initializer ? update(createJsxAttribute(name, initializer), node) : node;
            }
            function createJsxAttributes(properties) {
                const node = createBaseDeclaration(289 /* JsxAttributes */);
                node.properties = createNodeArray(properties);
                node.transformFlags |= propagateChildrenFlags(node.properties) | 2 /* ContainsJsx */;
                return node;
            }
            function updateJsxAttributes(node, properties) {
                return node.properties !== properties ? update(createJsxAttributes(properties), node) : node;
            }
            function createJsxSpreadAttribute(expression) {
                const node = createBaseNode(290 /* JsxSpreadAttribute */);
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.expression) | 2 /* ContainsJsx */;
                return node;
            }
            function updateJsxSpreadAttribute(node, expression) {
                return node.expression !== expression ? update(createJsxSpreadAttribute(expression), node) : node;
            }
            function createJsxExpression(dotDotDotToken, expression) {
                const node = createBaseNode(291 /* JsxExpression */);
                node.dotDotDotToken = dotDotDotToken;
                node.expression = expression;
                node.transformFlags |= propagateChildFlags(node.dotDotDotToken) | propagateChildFlags(node.expression) | 2 /* ContainsJsx */;
                return node;
            }
            function updateJsxExpression(node, expression) {
                return node.expression !== expression ? update(createJsxExpression(node.dotDotDotToken, expression), node) : node;
            }
            function createCaseClause(expression, statements) {
                const node = createBaseNode(292 /* CaseClause */);
                node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.statements = createNodeArray(statements);
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildrenFlags(node.statements);
                node.jsDoc = void 0;
                return node;
            }
            function updateCaseClause(node, expression, statements) {
                return node.expression !== expression || node.statements !== statements ? update(createCaseClause(expression, statements), node) : node;
            }
            function createDefaultClause(statements) {
                const node = createBaseNode(293 /* DefaultClause */);
                node.statements = createNodeArray(statements);
                node.transformFlags = propagateChildrenFlags(node.statements);
                return node;
            }
            function updateDefaultClause(node, statements) {
                return node.statements !== statements ? update(createDefaultClause(statements), node) : node;
            }
            function createHeritageClause(token, types) {
                const node = createBaseNode(294 /* HeritageClause */);
                node.token = token;
                node.types = createNodeArray(types);
                node.transformFlags |= propagateChildrenFlags(node.types);
                switch (token) {
                    case 94 /* ExtendsKeyword */:
                        node.transformFlags |= 1024 /* ContainsES2015 */;
                        break;
                    case 117 /* ImplementsKeyword */:
                        node.transformFlags |= 1 /* ContainsTypeScript */;
                        break;
                    default:
                        return Debug.assertNever(token);
                }
                return node;
            }
            function updateHeritageClause(node, types) {
                return node.types !== types ? update(createHeritageClause(node.token, types), node) : node;
            }
            function createCatchClause(variableDeclaration, block) {
                const node = createBaseNode(295 /* CatchClause */);
                node.variableDeclaration = asVariableDeclaration(variableDeclaration);
                node.block = block;
                node.transformFlags |= propagateChildFlags(node.variableDeclaration) | propagateChildFlags(node.block) | (!variableDeclaration ? 64 /* ContainsES2019 */ : 0 /* None */);
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }
            function updateCatchClause(node, variableDeclaration, block) {
                return node.variableDeclaration !== variableDeclaration || node.block !== block ? update(createCatchClause(variableDeclaration, block), node) : node;
            }
            function createPropertyAssignment(name, initializer) {
                const node = createBaseDeclaration(299 /* PropertyAssignment */);
                node.name = asName(name);
                node.initializer = parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
                node.transformFlags |= propagateNameFlags(node.name) | propagateChildFlags(node.initializer);
                node.modifiers = void 0;
                node.questionToken = void 0;
                node.exclamationToken = void 0;
                node.jsDoc = void 0;
                return node;
            }
            function updatePropertyAssignment(node, name, initializer) {
                return node.name !== name || node.initializer !== initializer ? finishUpdatePropertyAssignment(createPropertyAssignment(name, initializer), node) : node;
            }
            function finishUpdatePropertyAssignment(updated, original) {
                if (updated !== original) {
                    updated.modifiers = original.modifiers;
                    updated.questionToken = original.questionToken;
                    updated.exclamationToken = original.exclamationToken;
                }
                return update(updated, original);
            }
            function createShorthandPropertyAssignment(name, objectAssignmentInitializer) {
                const node = createBaseDeclaration(300 /* ShorthandPropertyAssignment */);
                node.name = asName(name);
                node.objectAssignmentInitializer = objectAssignmentInitializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(objectAssignmentInitializer);
                node.transformFlags |= propagateIdentifierNameFlags(node.name) | propagateChildFlags(node.objectAssignmentInitializer) | 1024 /* ContainsES2015 */;
                node.equalsToken = void 0;
                node.modifiers = void 0;
                node.questionToken = void 0;
                node.exclamationToken = void 0;
                node.jsDoc = void 0;
                return node;
            }
            function updateShorthandPropertyAssignment(node, name, objectAssignmentInitializer) {
                return node.name !== name || node.objectAssignmentInitializer !== objectAssignmentInitializer ? finishUpdateShorthandPropertyAssignment(createShorthandPropertyAssignment(name, objectAssignmentInitializer), node) : node;
            }
            function finishUpdateShorthandPropertyAssignment(updated, original) {
                if (updated !== original) {
                    updated.modifiers = original.modifiers;
                    updated.questionToken = original.questionToken;
                    updated.exclamationToken = original.exclamationToken;
                    updated.equalsToken = original.equalsToken;
                }
                return update(updated, original);
            }
            function createSpreadAssignment(expression) {
                const node = createBaseDeclaration(301 /* SpreadAssignment */);
                node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
                node.transformFlags |= propagateChildFlags(node.expression) | 128 /* ContainsES2018 */ | 65536 /* ContainsObjectRestOrSpread */;
                node.jsDoc = void 0;
                return node;
            }
            function updateSpreadAssignment(node, expression) {
                return node.expression !== expression ? update(createSpreadAssignment(expression), node) : node;
            }
            function createEnumMember(name, initializer) {
                const node = createBaseDeclaration(302 /* EnumMember */);
                node.name = asName(name);
                node.initializer = initializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
                node.transformFlags |= propagateChildFlags(node.name) | propagateChildFlags(node.initializer) | 1 /* ContainsTypeScript */;
                node.jsDoc = void 0;
                return node;
            }
            function updateEnumMember(node, name, initializer) {
                return node.name !== name || node.initializer !== initializer ? update(createEnumMember(name, initializer), node) : node;
            }
            function createSourceFile2(statements, endOfFileToken, flags2) {
                const node = baseFactory2.createBaseSourceFileNode(308 /* SourceFile */);
                node.statements = createNodeArray(statements);
                node.endOfFileToken = endOfFileToken;
                node.flags |= flags2;
                node.text = "";
                node.fileName = "";
                node.path = "";
                node.resolvedPath = "";
                node.originalFileName = "";
                node.languageVersion = 0;
                node.languageVariant = 0;
                node.scriptKind = 0;
                node.isDeclarationFile = false;
                node.hasNoDefaultLib = false;
                node.transformFlags |= propagateChildrenFlags(node.statements) | propagateChildFlags(node.endOfFileToken);
                node.locals = void 0;
                node.nextContainer = void 0;
                node.endFlowNode = void 0;
                node.nodeCount = 0;
                node.identifierCount = 0;
                node.symbolCount = 0;
                node.parseDiagnostics = void 0;
                node.bindDiagnostics = void 0;
                node.bindSuggestionDiagnostics = void 0;
                node.lineMap = void 0;
                node.externalModuleIndicator = void 0;
                node.setExternalModuleIndicator = void 0;
                node.pragmas = void 0;
                node.checkJsDirective = void 0;
                node.referencedFiles = void 0;
                node.typeReferenceDirectives = void 0;
                node.libReferenceDirectives = void 0;
                node.amdDependencies = void 0;
                node.commentDirectives = void 0;
                node.identifiers = void 0;
                node.packageJsonLocations = void 0;
                node.packageJsonScope = void 0;
                node.imports = void 0;
                node.moduleAugmentations = void 0;
                node.ambientModuleNames = void 0;
                node.resolvedModules = void 0;
                node.classifiableNames = void 0;
                node.impliedNodeFormat = void 0;
                return node;
            }
            function createRedirectedSourceFile(redirectInfo) {
                const node = Object.create(redirectInfo.redirectTarget);
                Object.defineProperties(node, {
                    id: {
                        get() {
                            return this.redirectInfo.redirectTarget.id;
                        },
                        set(value) {
                            this.redirectInfo.redirectTarget.id = value;
                        }
                    },
                    symbol: {
                        get() {
                            return this.redirectInfo.redirectTarget.symbol;
                        },
                        set(value) {
                            this.redirectInfo.redirectTarget.symbol = value;
                        }
                    }
                });
                node.redirectInfo = redirectInfo;
                return node;
            }
            function cloneRedirectedSourceFile(source) {
                const node = createRedirectedSourceFile(source.redirectInfo);
                node.flags |= source.flags & ~8 /* Synthesized */;
                node.fileName = source.fileName;
                node.path = source.path;
                node.resolvedPath = source.resolvedPath;
                node.originalFileName = source.originalFileName;
                node.packageJsonLocations = source.packageJsonLocations;
                node.packageJsonScope = source.packageJsonScope;
                node.emitNode = void 0;
                return node;
            }
            function cloneSourceFileWorker(source) {
                const node = baseFactory2.createBaseSourceFileNode(308 /* SourceFile */);
                node.flags |= source.flags & ~8 /* Synthesized */;
                for (const p in source) {
                    if (hasProperty(node, p) || !hasProperty(source, p)) {
                        continue;
                    }
                    if (p === "emitNode") {
                        node.emitNode = void 0;
                        continue;
                    }
                    node[p] = source[p];
                }
                return node;
            }
            function cloneSourceFile(source) {
                const node = source.redirectInfo ? cloneRedirectedSourceFile(source) : cloneSourceFileWorker(source);
                setOriginalNode(node, source);
                return node;
            }
            function cloneSourceFileWithChanges(source, statements, isDeclarationFile, referencedFiles, typeReferences, hasNoDefaultLib, libReferences) {
                const node = cloneSourceFile(source);
                node.statements = createNodeArray(statements);
                node.isDeclarationFile = isDeclarationFile;
                node.referencedFiles = referencedFiles;
                node.typeReferenceDirectives = typeReferences;
                node.hasNoDefaultLib = hasNoDefaultLib;
                node.libReferenceDirectives = libReferences;
                node.transformFlags = propagateChildrenFlags(node.statements) | propagateChildFlags(node.endOfFileToken);
                return node;
            }
            function updateSourceFile2(node, statements, isDeclarationFile = node.isDeclarationFile, referencedFiles = node.referencedFiles, typeReferenceDirectives = node.typeReferenceDirectives, hasNoDefaultLib = node.hasNoDefaultLib, libReferenceDirectives = node.libReferenceDirectives) {
                return node.statements !== statements || node.isDeclarationFile !== isDeclarationFile || node.referencedFiles !== referencedFiles || node.typeReferenceDirectives !== typeReferenceDirectives || node.hasNoDefaultLib !== hasNoDefaultLib || node.libReferenceDirectives !== libReferenceDirectives ? update(cloneSourceFileWithChanges(node, statements, isDeclarationFile, referencedFiles, typeReferenceDirectives, hasNoDefaultLib, libReferenceDirectives), node) : node;
            }
            function createBundle(sourceFiles, prepends = emptyArray) {
                const node = createBaseNode(309 /* Bundle */);
                node.prepends = prepends;
                node.sourceFiles = sourceFiles;
                node.syntheticFileReferences = void 0;
                node.syntheticTypeReferences = void 0;
                node.syntheticLibReferences = void 0;
                node.hasNoDefaultLib = void 0;
                return node;
            }
            function updateBundle(node, sourceFiles, prepends = emptyArray) {
                return node.sourceFiles !== sourceFiles || node.prepends !== prepends ? update(createBundle(sourceFiles, prepends), node) : node;
            }
            function createUnparsedSource(prologues, syntheticReferences, texts) {
                const node = createBaseNode(310 /* UnparsedSource */);
                node.prologues = prologues;
                node.syntheticReferences = syntheticReferences;
                node.texts = texts;
                node.fileName = "";
                node.text = "";
                node.referencedFiles = emptyArray;
                node.libReferenceDirectives = emptyArray;
                node.getLineAndCharacterOfPosition = (pos) => getLineAndCharacterOfPosition(node, pos);
                return node;
            }
            function createBaseUnparsedNode(kind, data) {
                const node = createBaseNode(kind);
                node.data = data;
                return node;
            }
            function createUnparsedPrologue(data) {
                return createBaseUnparsedNode(303 /* UnparsedPrologue */, data);
            }
            function createUnparsedPrepend(data, texts) {
                const node = createBaseUnparsedNode(304 /* UnparsedPrepend */, data);
                node.texts = texts;
                return node;
            }
            function createUnparsedTextLike(data, internal) {
                return createBaseUnparsedNode(internal ? 306 /* UnparsedInternalText */ : 305 /* UnparsedText */, data);
            }
            function createUnparsedSyntheticReference(section) {
                const node = createBaseNode(307 /* UnparsedSyntheticReference */);
                node.data = section.data;
                node.section = section;
                return node;
            }
            function createInputFiles2() {
                const node = createBaseNode(311 /* InputFiles */);
                node.javascriptText = "";
                node.declarationText = "";
                return node;
            }
            function createSyntheticExpression(type, isSpread = false, tupleNameSource) {
                const node = createBaseNode(234 /* SyntheticExpression */);
                node.type = type;
                node.isSpread = isSpread;
                node.tupleNameSource = tupleNameSource;
                return node;
            }
            function createSyntaxList3(children) {
                const node = createBaseNode(354 /* SyntaxList */);
                node._children = children;
                return node;
            }
            function createNotEmittedStatement(original) {
                const node = createBaseNode(355 /* NotEmittedStatement */);
                node.original = original;
                setTextRange(node, original);
                return node;
            }
            function createPartiallyEmittedExpression(expression, original) {
                const node = createBaseNode(356 /* PartiallyEmittedExpression */);
                node.expression = expression;
                node.original = original;
                node.transformFlags |= propagateChildFlags(node.expression) | 1 /* ContainsTypeScript */;
                setTextRange(node, original);
                return node;
            }
            function updatePartiallyEmittedExpression(node, expression) {
                return node.expression !== expression ? update(createPartiallyEmittedExpression(expression, node.original), node) : node;
            }
            function flattenCommaElements(node) {
                if (nodeIsSynthesized(node) && !isParseTreeNode(node) && !node.original && !node.emitNode && !node.id) {
                    if (isCommaListExpression(node)) {
                        return node.elements;
                    }
                    if (isBinaryExpression(node) && isCommaToken(node.operatorToken)) {
                        return [node.left, node.right];
                    }
                }
                return node;
            }
            function createCommaListExpression(elements) {
                const node = createBaseNode(357 /* CommaListExpression */);
                node.elements = createNodeArray(sameFlatMap(elements, flattenCommaElements));
                node.transformFlags |= propagateChildrenFlags(node.elements);
                return node;
            }
            function updateCommaListExpression(node, elements) {
                return node.elements !== elements ? update(createCommaListExpression(elements), node) : node;
            }
            function createEndOfDeclarationMarker(original) {
                const node = createBaseNode(359 /* EndOfDeclarationMarker */);
                node.emitNode = {};
                node.original = original;
                return node;
            }
            function createMergeDeclarationMarker(original) {
                const node = createBaseNode(358 /* MergeDeclarationMarker */);
                node.emitNode = {};
                node.original = original;
                return node;
            }
            function createSyntheticReferenceExpression(expression, thisArg) {
                const node = createBaseNode(360 /* SyntheticReferenceExpression */);
                node.expression = expression;
                node.thisArg = thisArg;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildFlags(node.thisArg);
                return node;
            }
            function updateSyntheticReferenceExpression(node, expression, thisArg) {
                return node.expression !== expression || node.thisArg !== thisArg ? update(createSyntheticReferenceExpression(expression, thisArg), node) : node;
            }
            function cloneGeneratedIdentifier(node) {
                const clone2 = createBaseIdentifier(node.escapedText);
                clone2.flags |= node.flags & ~8 /* Synthesized */;
                clone2.transformFlags = node.transformFlags;
                setOriginalNode(clone2, node);
                setIdentifierAutoGenerate(clone2, { ...node.emitNode.autoGenerate });
                return clone2;
            }
            function cloneIdentifier(node) {
                const clone2 = createBaseIdentifier(node.escapedText);
                clone2.flags |= node.flags & ~8 /* Synthesized */;
                clone2.jsDoc = node.jsDoc;
                clone2.flowNode = node.flowNode;
                clone2.symbol = node.symbol;
                clone2.transformFlags = node.transformFlags;
                setOriginalNode(clone2, node);
                const typeArguments = getIdentifierTypeArguments(node);
                if (typeArguments)
                    setIdentifierTypeArguments(clone2, typeArguments);
                return clone2;
            }
            function cloneGeneratedPrivateIdentifier(node) {
                const clone2 = createBasePrivateIdentifier(node.escapedText);
                clone2.flags |= node.flags & ~8 /* Synthesized */;
                clone2.transformFlags = node.transformFlags;
                setOriginalNode(clone2, node);
                setIdentifierAutoGenerate(clone2, { ...node.emitNode.autoGenerate });
                return clone2;
            }
            function clonePrivateIdentifier(node) {
                const clone2 = createBasePrivateIdentifier(node.escapedText);
                clone2.flags |= node.flags & ~8 /* Synthesized */;
                clone2.transformFlags = node.transformFlags;
                setOriginalNode(clone2, node);
                return clone2;
            }
            function cloneNode(node) {
                if (node === void 0) {
                    return node;
                }
                if (isSourceFile(node)) {
                    return cloneSourceFile(node);
                }
                if (isGeneratedIdentifier(node)) {
                    return cloneGeneratedIdentifier(node);
                }
                if (isIdentifier(node)) {
                    return cloneIdentifier(node);
                }
                if (isGeneratedPrivateIdentifier(node)) {
                    return cloneGeneratedPrivateIdentifier(node);
                }
                if (isPrivateIdentifier(node)) {
                    return clonePrivateIdentifier(node);
                }
                const clone2 = !isNodeKind(node.kind) ? baseFactory2.createBaseTokenNode(node.kind) : baseFactory2.createBaseNode(node.kind);
                clone2.flags |= node.flags & ~8 /* Synthesized */;
                clone2.transformFlags = node.transformFlags;
                setOriginalNode(clone2, node);
                for (const key in node) {
                    if (hasProperty(clone2, key) || !hasProperty(node, key)) {
                        continue;
                    }
                    clone2[key] = node[key];
                }
                return clone2;
            }
            function createImmediatelyInvokedFunctionExpression(statements, param, paramValue) {
                return createCallExpression(createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, 
                /*parameters*/
                param ? [param] : [], 
                /*type*/
                void 0, createBlock(statements, 
                /*multiLine*/
                true)), 
                /*typeArguments*/
                void 0, 
                /*argumentsArray*/
                paramValue ? [paramValue] : []);
            }
            function createImmediatelyInvokedArrowFunction(statements, param, paramValue) {
                return createCallExpression(createArrowFunction(
                /*modifiers*/
                void 0, 
                /*typeParameters*/
                void 0, 
                /*parameters*/
                param ? [param] : [], 
                /*type*/
                void 0, 
                /*equalsGreaterThanToken*/
                void 0, createBlock(statements, 
                /*multiLine*/
                true)), 
                /*typeArguments*/
                void 0, 
                /*argumentsArray*/
                paramValue ? [paramValue] : []);
            }
            function createVoidZero() {
                return createVoidExpression(createNumericLiteral("0"));
            }
            function createExportDefault(expression) {
                return createExportAssignment2(
                /*modifiers*/
                void 0, 
                /*isExportEquals*/
                false, expression);
            }
            function createExternalModuleExport(exportName) {
                return createExportDeclaration(
                /*modifiers*/
                void 0, 
                /*isTypeOnly*/
                false, createNamedExports([
                    createExportSpecifier(
                    /*isTypeOnly*/
                    false, 
                    /*propertyName*/
                    void 0, exportName)
                ]));
            }
            function createTypeCheck(value, tag) {
                return tag === "undefined" ? factory2.createStrictEquality(value, createVoidZero()) : factory2.createStrictEquality(createTypeOfExpression(value), createStringLiteral(tag));
            }
            function createMethodCall(object, methodName, argumentsList) {
                if (isCallChain(object)) {
                    return createCallChain(createPropertyAccessChain(object, 
                    /*questionDotToken*/
                    void 0, methodName), 
                    /*questionDotToken*/
                    void 0, 
                    /*typeArguments*/
                    void 0, argumentsList);
                }
                return createCallExpression(createPropertyAccessExpression(object, methodName), 
                /*typeArguments*/
                void 0, argumentsList);
            }
            function createFunctionBindCall(target, thisArg, argumentsList) {
                return createMethodCall(target, "bind", [thisArg, ...argumentsList]);
            }
            function createFunctionCallCall(target, thisArg, argumentsList) {
                return createMethodCall(target, "call", [thisArg, ...argumentsList]);
            }
            function createFunctionApplyCall(target, thisArg, argumentsExpression) {
                return createMethodCall(target, "apply", [thisArg, argumentsExpression]);
            }
            function createGlobalMethodCall(globalObjectName, methodName, argumentsList) {
                return createMethodCall(createIdentifier(globalObjectName), methodName, argumentsList);
            }
            function createArraySliceCall(array, start) {
                return createMethodCall(array, "slice", start === void 0 ? [] : [asExpression(start)]);
            }
            function createArrayConcatCall(array, argumentsList) {
                return createMethodCall(array, "concat", argumentsList);
            }
            function createObjectDefinePropertyCall(target, propertyName, attributes) {
                return createGlobalMethodCall("Object", "defineProperty", [target, asExpression(propertyName), attributes]);
            }
            function createObjectGetOwnPropertyDescriptorCall(target, propertyName) {
                return createGlobalMethodCall("Object", "getOwnPropertyDescriptor", [target, asExpression(propertyName)]);
            }
            function createReflectGetCall(target, propertyKey, receiver) {
                return createGlobalMethodCall("Reflect", "get", receiver ? [target, propertyKey, receiver] : [target, propertyKey]);
            }
            function createReflectSetCall(target, propertyKey, value, receiver) {
                return createGlobalMethodCall("Reflect", "set", receiver ? [target, propertyKey, value, receiver] : [target, propertyKey, value]);
            }
            function tryAddPropertyAssignment(properties, propertyName, expression) {
                if (expression) {
                    properties.push(createPropertyAssignment(propertyName, expression));
                    return true;
                }
                return false;
            }
            function createPropertyDescriptor(attributes, singleLine) {
                const properties = [];
                tryAddPropertyAssignment(properties, "enumerable", asExpression(attributes.enumerable));
                tryAddPropertyAssignment(properties, "configurable", asExpression(attributes.configurable));
                let isData = tryAddPropertyAssignment(properties, "writable", asExpression(attributes.writable));
                isData = tryAddPropertyAssignment(properties, "value", attributes.value) || isData;
                let isAccessor2 = tryAddPropertyAssignment(properties, "get", attributes.get);
                isAccessor2 = tryAddPropertyAssignment(properties, "set", attributes.set) || isAccessor2;
                Debug.assert(!(isData && isAccessor2), "A PropertyDescriptor may not be both an accessor descriptor and a data descriptor.");
                return createObjectLiteralExpression(properties, !singleLine);
            }
            function updateOuterExpression(outerExpression, expression) {
                switch (outerExpression.kind) {
                    case 214 /* ParenthesizedExpression */:
                        return updateParenthesizedExpression(outerExpression, expression);
                    case 213 /* TypeAssertionExpression */:
                        return updateTypeAssertion(outerExpression, outerExpression.type, expression);
                    case 231 /* AsExpression */:
                        return updateAsExpression(outerExpression, expression, outerExpression.type);
                    case 235 /* SatisfiesExpression */:
                        return updateSatisfiesExpression(outerExpression, expression, outerExpression.type);
                    case 232 /* NonNullExpression */:
                        return updateNonNullExpression(outerExpression, expression);
                    case 356 /* PartiallyEmittedExpression */:
                        return updatePartiallyEmittedExpression(outerExpression, expression);
                }
            }
            function isIgnorableParen(node) {
                return isParenthesizedExpression(node) && nodeIsSynthesized(node) && nodeIsSynthesized(getSourceMapRange(node)) && nodeIsSynthesized(getCommentRange(node)) && !some(getSyntheticLeadingComments(node)) && !some(getSyntheticTrailingComments(node));
            }
            function restoreOuterExpressions(outerExpression, innerExpression, kinds = 15 /* All */) {
                if (outerExpression && isOuterExpression(outerExpression, kinds) && !isIgnorableParen(outerExpression)) {
                    return updateOuterExpression(outerExpression, restoreOuterExpressions(outerExpression.expression, innerExpression));
                }
                return innerExpression;
            }
            function restoreEnclosingLabel(node, outermostLabeledStatement, afterRestoreLabelCallback) {
                if (!outermostLabeledStatement) {
                    return node;
                }
                const updated = updateLabeledStatement(outermostLabeledStatement, outermostLabeledStatement.label, isLabeledStatement(outermostLabeledStatement.statement) ? restoreEnclosingLabel(node, outermostLabeledStatement.statement) : node);
                if (afterRestoreLabelCallback) {
                    afterRestoreLabelCallback(outermostLabeledStatement);
                }
                return updated;
            }
            function shouldBeCapturedInTempVariable(node, cacheIdentifiers) {
                const target = skipParentheses(node);
                switch (target.kind) {
                    case 79 /* Identifier */:
                        return cacheIdentifiers;
                    case 108 /* ThisKeyword */:
                    case 8 /* NumericLiteral */:
                    case 9 /* BigIntLiteral */:
                    case 10 /* StringLiteral */:
                        return false;
                    case 206 /* ArrayLiteralExpression */:
                        const elements = target.elements;
                        if (elements.length === 0) {
                            return false;
                        }
                        return true;
                    case 207 /* ObjectLiteralExpression */:
                        return target.properties.length > 0;
                    default:
                        return true;
                }
            }
            function createCallBinding(expression, recordTempVariable, languageVersion, cacheIdentifiers = false) {
                const callee = skipOuterExpressions(expression, 15 /* All */);
                let thisArg;
                let target;
                if (isSuperProperty(callee)) {
                    thisArg = createThis();
                    target = callee;
                }
                else if (isSuperKeyword(callee)) {
                    thisArg = createThis();
                    target = languageVersion !== void 0 && languageVersion < 2 /* ES2015 */ ? setTextRange(createIdentifier("_super"), callee) : callee;
                }
                else if (getEmitFlags(callee) & 8192 /* HelperName */) {
                    thisArg = createVoidZero();
                    target = parenthesizerRules().parenthesizeLeftSideOfAccess(callee, 
                    /*optionalChain*/
                    false);
                }
                else if (isPropertyAccessExpression(callee)) {
                    if (shouldBeCapturedInTempVariable(callee.expression, cacheIdentifiers)) {
                        thisArg = createTempVariable(recordTempVariable);
                        target = createPropertyAccessExpression(setTextRange(factory2.createAssignment(thisArg, callee.expression), callee.expression), callee.name);
                        setTextRange(target, callee);
                    }
                    else {
                        thisArg = callee.expression;
                        target = callee;
                    }
                }
                else if (isElementAccessExpression(callee)) {
                    if (shouldBeCapturedInTempVariable(callee.expression, cacheIdentifiers)) {
                        thisArg = createTempVariable(recordTempVariable);
                        target = createElementAccessExpression(setTextRange(factory2.createAssignment(thisArg, callee.expression), callee.expression), callee.argumentExpression);
                        setTextRange(target, callee);
                    }
                    else {
                        thisArg = callee.expression;
                        target = callee;
                    }
                }
                else {
                    thisArg = createVoidZero();
                    target = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                    /*optionalChain*/
                    false);
                }
                return { target, thisArg };
            }
            function createAssignmentTargetWrapper(paramName, expression) {
                return createPropertyAccessExpression(
                // Explicit parens required because of v8 regression (https://bugs.chromium.org/p/v8/issues/detail?id=9560)
                createParenthesizedExpression(createObjectLiteralExpression([
                    createSetAccessorDeclaration(
                    /*modifiers*/
                    void 0, "value", [createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, paramName, 
                        /*questionToken*/
                        void 0, 
                        /*type*/
                        void 0, 
                        /*initializer*/
                        void 0)], createBlock([
                        createExpressionStatement(expression)
                    ]))
                ])), "value");
            }
            function inlineExpressions(expressions) {
                return expressions.length > 10 ? createCommaListExpression(expressions) : reduceLeft(expressions, factory2.createComma);
            }
            function getName(node, allowComments, allowSourceMaps, emitFlags = 0) {
                const nodeName = getNameOfDeclaration(node);
                if (nodeName && isIdentifier(nodeName) && !isGeneratedIdentifier(nodeName)) {
                    const name = setParent(setTextRange(cloneNode(nodeName), nodeName), nodeName.parent);
                    emitFlags |= getEmitFlags(nodeName);
                    if (!allowSourceMaps)
                        emitFlags |= 96 /* NoSourceMap */;
                    if (!allowComments)
                        emitFlags |= 3072 /* NoComments */;
                    if (emitFlags)
                        setEmitFlags(name, emitFlags);
                    return name;
                }
                return getGeneratedNameForNode(node);
            }
            function getInternalName(node, allowComments, allowSourceMaps) {
                return getName(node, allowComments, allowSourceMaps, 32768 /* LocalName */ | 65536 /* InternalName */);
            }
            function getLocalName(node, allowComments, allowSourceMaps) {
                return getName(node, allowComments, allowSourceMaps, 32768 /* LocalName */);
            }
            function getExportName(node, allowComments, allowSourceMaps) {
                return getName(node, allowComments, allowSourceMaps, 16384 /* ExportName */);
            }
            function getDeclarationName(node, allowComments, allowSourceMaps) {
                return getName(node, allowComments, allowSourceMaps);
            }
            function getNamespaceMemberName(ns, name, allowComments, allowSourceMaps) {
                const qualifiedName = createPropertyAccessExpression(ns, nodeIsSynthesized(name) ? name : cloneNode(name));
                setTextRange(qualifiedName, name);
                let emitFlags = 0;
                if (!allowSourceMaps)
                    emitFlags |= 96 /* NoSourceMap */;
                if (!allowComments)
                    emitFlags |= 3072 /* NoComments */;
                if (emitFlags)
                    setEmitFlags(qualifiedName, emitFlags);
                return qualifiedName;
            }
            function getExternalModuleOrNamespaceExportName(ns, node, allowComments, allowSourceMaps) {
                if (ns && hasSyntacticModifier(node, 1 /* Export */)) {
                    return getNamespaceMemberName(ns, getName(node), allowComments, allowSourceMaps);
                }
                return getExportName(node, allowComments, allowSourceMaps);
            }
            function copyPrologue(source, target, ensureUseStrict2, visitor) {
                const offset = copyStandardPrologue(source, target, 0, ensureUseStrict2);
                return copyCustomPrologue(source, target, offset, visitor);
            }
            function isUseStrictPrologue2(node) {
                return isStringLiteral(node.expression) && node.expression.text === "use strict";
            }
            function createUseStrictPrologue() {
                return startOnNewLine(createExpressionStatement(createStringLiteral("use strict")));
            }
            function copyStandardPrologue(source, target, statementOffset = 0, ensureUseStrict2) {
                Debug.assert(target.length === 0, "Prologue directives should be at the first statement in the target statements array");
                let foundUseStrict = false;
                const numStatements = source.length;
                while (statementOffset < numStatements) {
                    const statement = source[statementOffset];
                    if (isPrologueDirective(statement)) {
                        if (isUseStrictPrologue2(statement)) {
                            foundUseStrict = true;
                        }
                        target.push(statement);
                    }
                    else {
                        break;
                    }
                    statementOffset++;
                }
                if (ensureUseStrict2 && !foundUseStrict) {
                    target.push(createUseStrictPrologue());
                }
                return statementOffset;
            }
            function copyCustomPrologue(source, target, statementOffset, visitor, filter2 = returnTrue) {
                const numStatements = source.length;
                while (statementOffset !== void 0 && statementOffset < numStatements) {
                    const statement = source[statementOffset];
                    if (getEmitFlags(statement) & 2097152 /* CustomPrologue */ && filter2(statement)) {
                        append(target, visitor ? visitNode(statement, visitor, isStatement) : statement);
                    }
                    else {
                        break;
                    }
                    statementOffset++;
                }
                return statementOffset;
            }
            function ensureUseStrict(statements) {
                const foundUseStrict = findUseStrictPrologue(statements);
                if (!foundUseStrict) {
                    return setTextRange(createNodeArray([createUseStrictPrologue(), ...statements]), statements);
                }
                return statements;
            }
            function liftToBlock(nodes) {
                Debug.assert(every(nodes, isStatementOrBlock), "Cannot lift nodes to a Block.");
                return singleOrUndefined(nodes) || createBlock(nodes);
            }
            function findSpanEnd(array, test, start) {
                let i = start;
                while (i < array.length && test(array[i])) {
                    i++;
                }
                return i;
            }
            function mergeLexicalEnvironment(statements, declarations) {
                if (!some(declarations)) {
                    return statements;
                }
                const leftStandardPrologueEnd = findSpanEnd(statements, isPrologueDirective, 0);
                const leftHoistedFunctionsEnd = findSpanEnd(statements, isHoistedFunction, leftStandardPrologueEnd);
                const leftHoistedVariablesEnd = findSpanEnd(statements, isHoistedVariableStatement, leftHoistedFunctionsEnd);
                const rightStandardPrologueEnd = findSpanEnd(declarations, isPrologueDirective, 0);
                const rightHoistedFunctionsEnd = findSpanEnd(declarations, isHoistedFunction, rightStandardPrologueEnd);
                const rightHoistedVariablesEnd = findSpanEnd(declarations, isHoistedVariableStatement, rightHoistedFunctionsEnd);
                const rightCustomPrologueEnd = findSpanEnd(declarations, isCustomPrologue, rightHoistedVariablesEnd);
                Debug.assert(rightCustomPrologueEnd === declarations.length, "Expected declarations to be valid standard or custom prologues");
                const left = isNodeArray(statements) ? statements.slice() : statements;
                if (rightCustomPrologueEnd > rightHoistedVariablesEnd) {
                    left.splice(leftHoistedVariablesEnd, 0, ...declarations.slice(rightHoistedVariablesEnd, rightCustomPrologueEnd));
                }
                if (rightHoistedVariablesEnd > rightHoistedFunctionsEnd) {
                    left.splice(leftHoistedFunctionsEnd, 0, ...declarations.slice(rightHoistedFunctionsEnd, rightHoistedVariablesEnd));
                }
                if (rightHoistedFunctionsEnd > rightStandardPrologueEnd) {
                    left.splice(leftStandardPrologueEnd, 0, ...declarations.slice(rightStandardPrologueEnd, rightHoistedFunctionsEnd));
                }
                if (rightStandardPrologueEnd > 0) {
                    if (leftStandardPrologueEnd === 0) {
                        left.splice(0, 0, ...declarations.slice(0, rightStandardPrologueEnd));
                    }
                    else {
                        const leftPrologues = /* @__PURE__ */ new Map();
                        for (let i = 0; i < leftStandardPrologueEnd; i++) {
                            const leftPrologue = statements[i];
                            leftPrologues.set(leftPrologue.expression.text, true);
                        }
                        for (let i = rightStandardPrologueEnd - 1; i >= 0; i--) {
                            const rightPrologue = declarations[i];
                            if (!leftPrologues.has(rightPrologue.expression.text)) {
                                left.unshift(rightPrologue);
                            }
                        }
                    }
                }
                if (isNodeArray(statements)) {
                    return setTextRange(createNodeArray(left, statements.hasTrailingComma), statements);
                }
                return statements;
            }
            function updateModifiers(node, modifiers) {
                var _a2;
                let modifierArray;
                if (typeof modifiers === "number") {
                    modifierArray = createModifiersFromModifierFlags(modifiers);
                }
                else {
                    modifierArray = modifiers;
                }
                return isTypeParameterDeclaration(node) ? updateTypeParameterDeclaration(node, modifierArray, node.name, node.constraint, node.default) : isParameter(node) ? updateParameterDeclaration(node, modifierArray, node.dotDotDotToken, node.name, node.questionToken, node.type, node.initializer) : isConstructorTypeNode(node) ? updateConstructorTypeNode1(node, modifierArray, node.typeParameters, node.parameters, node.type) : isPropertySignature(node) ? updatePropertySignature(node, modifierArray, node.name, node.questionToken, node.type) : isPropertyDeclaration(node) ? updatePropertyDeclaration2(node, modifierArray, node.name, (_a2 = node.questionToken) != null ? _a2 : node.exclamationToken, node.type, node.initializer) : isMethodSignature(node) ? updateMethodSignature(node, modifierArray, node.name, node.questionToken, node.typeParameters, node.parameters, node.type) : isMethodDeclaration(node) ? updateMethodDeclaration(node, modifierArray, node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body) : isConstructorDeclaration(node) ? updateConstructorDeclaration(node, modifierArray, node.parameters, node.body) : isGetAccessorDeclaration(node) ? updateGetAccessorDeclaration(node, modifierArray, node.name, node.parameters, node.type, node.body) : isSetAccessorDeclaration(node) ? updateSetAccessorDeclaration(node, modifierArray, node.name, node.parameters, node.body) : isIndexSignatureDeclaration(node) ? updateIndexSignature(node, modifierArray, node.parameters, node.type) : isFunctionExpression(node) ? updateFunctionExpression(node, modifierArray, node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body) : isArrowFunction(node) ? updateArrowFunction(node, modifierArray, node.typeParameters, node.parameters, node.type, node.equalsGreaterThanToken, node.body) : isClassExpression(node) ? updateClassExpression(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) : isVariableStatement(node) ? updateVariableStatement(node, modifierArray, node.declarationList) : isFunctionDeclaration(node) ? updateFunctionDeclaration(node, modifierArray, node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body) : isClassDeclaration(node) ? updateClassDeclaration(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) : isInterfaceDeclaration(node) ? updateInterfaceDeclaration(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) : isTypeAliasDeclaration(node) ? updateTypeAliasDeclaration(node, modifierArray, node.name, node.typeParameters, node.type) : isEnumDeclaration(node) ? updateEnumDeclaration(node, modifierArray, node.name, node.members) : isModuleDeclaration(node) ? updateModuleDeclaration(node, modifierArray, node.name, node.body) : isImportEqualsDeclaration(node) ? updateImportEqualsDeclaration(node, modifierArray, node.isTypeOnly, node.name, node.moduleReference) : isImportDeclaration(node) ? updateImportDeclaration(node, modifierArray, node.importClause, node.moduleSpecifier, node.assertClause) : isExportAssignment(node) ? updateExportAssignment(node, modifierArray, node.expression) : isExportDeclaration(node) ? updateExportDeclaration(node, modifierArray, node.isTypeOnly, node.exportClause, node.moduleSpecifier, node.assertClause) : Debug.assertNever(node);
            }
            function asNodeArray(array) {
                return array ? createNodeArray(array) : void 0;
            }
            function asName(name) {
                return typeof name === "string" ? createIdentifier(name) : name;
            }
            function asExpression(value) {
                return typeof value === "string" ? createStringLiteral(value) : typeof value === "number" ? createNumericLiteral(value) : typeof value === "boolean" ? value ? createTrue() : createFalse() : value;
            }
            function asInitializer(node) {
                return node && parenthesizerRules().parenthesizeExpressionForDisallowedComma(node);
            }
            function asToken(value) {
                return typeof value === "number" ? createToken(value) : value;
            }
            function asEmbeddedStatement(statement) {
                return statement && isNotEmittedStatement(statement) ? setTextRange(setOriginalNode(createEmptyStatement(), statement), statement) : statement;
            }
            function asVariableDeclaration(variableDeclaration) {
                if (typeof variableDeclaration === "string" || variableDeclaration && !isVariableDeclaration(variableDeclaration)) {
                    return createVariableDeclaration(variableDeclaration, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0);
                }
                return variableDeclaration;
            }
        }