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
            function createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer) {
            function updateParameterDeclaration(node, modifiers, dotDotDotToken, name, questionToken, type, initializer) {
            function updatePropertyDeclaration2(node, modifiers, name, questionOrExclamationToken, type, initializer) {
            function createMethodSignature(modifiers, name, questionToken, typeParameters, parameters, type) {
            function updateMethodSignature(node, modifiers, name, questionToken, typeParameters, parameters, type) {
            function createMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body) {
            function updateMethodDeclaration(node, modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body) {
            function updateGetAccessorDeclaration(node, modifiers, name, parameters, type, body) {
            function updateImportTypeNode(node, argument, assertions, qualifier, typeArguments, isTypeOf = node.isTypeOf) {
            function createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members) {
            function updateMappedTypeNode(node, readonlyToken, typeParameter, nameType, questionToken, type, members) {
            function createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body) {
            function updateFunctionExpression(node, modifiers, asteriskToken, name, typeParameters, parameters, type, body) {
            function createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body) {
            function updateArrowFunction(node, modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body) {
            function updateConditionalExpression(node, condition, questionToken, whenTrue, colonToken, whenFalse) {
            function updateClassExpression(node, modifiers, name, typeParameters, heritageClauses, members) {
            function createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body) {
            function updateFunctionDeclaration(node, modifiers, asteriskToken, name, typeParameters, parameters, type, body) {
            function updateClassDeclaration(node, modifiers, name, typeParameters, heritageClauses, members) {
            function updateInterfaceDeclaration(node, modifiers, name, typeParameters, heritageClauses, members) {
            function updateExportDeclaration(node, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause) {
            function createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment) {
            function updateJSDocParameterTag(node, tagName = getDefaultTagName(node), name, isBracketed, typeExpression, isNameFirst, comment) {
            function createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment) {
            function updateJSDocPropertyTag(node, tagName = getDefaultTagName(node), name, isBracketed, typeExpression, isNameFirst, comment) {
            function cloneSourceFileWithChanges(source, statements, isDeclarationFile, referencedFiles, typeReferences, hasNoDefaultLib, libReferences) {
            function updateSourceFile2(node, statements, isDeclarationFile = node.isDeclarationFile, referencedFiles = node.referencedFiles, typeReferenceDirectives = node.typeReferenceDirectives, hasNoDefaultLib = node.hasNoDefaultLib, libReferenceDirectives = node.libReferenceDirectives) {
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