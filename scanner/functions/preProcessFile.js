function preProcessFile(sourceText, readImportFiles = true, detectJavaScriptImports = false) {
            const pragmaContext = {
                languageVersion: 1 /* ES5 */,
                // controls whether the token scanner considers unicode identifiers or not - shouldn't matter, since we're only using it for trivia
                pragmas: void 0,
                checkJsDirective: void 0,
                referencedFiles: [],
                typeReferenceDirectives: [],
                libReferenceDirectives: [],
                amdDependencies: [],
                hasNoDefaultLib: void 0,
                moduleName: void 0
            };
            const importedFiles = [];
            let ambientExternalModules;
            let lastToken;
            let currentToken;
            let braceNesting = 0;
            let externalModule = false;
            function nextToken() {
                lastToken = currentToken;
                currentToken = scanner.scan();
                if (currentToken === 18 /* OpenBraceToken */) {
                    braceNesting++;
                }
                else if (currentToken === 19 /* CloseBraceToken */) {
                    braceNesting--;
                }
                return currentToken;
            }
            function getFileReference() {
                const fileName = scanner.getTokenValue();
                const pos = scanner.getTokenPos();
                return { fileName, pos, end: pos + fileName.length };
            }
            function recordAmbientExternalModule() {
                if (!ambientExternalModules) {
                    ambientExternalModules = [];
                }
                ambientExternalModules.push({ ref: getFileReference(), depth: braceNesting });
            }
            function recordModuleName() {
                importedFiles.push(getFileReference());
                markAsExternalModuleIfTopLevel();
            }
            function markAsExternalModuleIfTopLevel() {
                if (braceNesting === 0) {
                    externalModule = true;
                }
            }
            function tryConsumeDeclare() {
                let token = scanner.getToken();
                if (token === 136 /* DeclareKeyword */) {
                    token = nextToken();
                    if (token === 142 /* ModuleKeyword */) {
                        token = nextToken();
                        if (token === 10 /* StringLiteral */) {
                            recordAmbientExternalModule();
                        }
                    }
                    return true;
                }
                return false;
            }
            function tryConsumeImport() {
                if (lastToken === 24 /* DotToken */) {
                    return false;
                }
                let token = scanner.getToken();
                if (token === 100 /* ImportKeyword */) {
                    token = nextToken();
                    if (token === 20 /* OpenParenToken */) {
                        token = nextToken();
                        if (token === 10 /* StringLiteral */ || token === 14 /* NoSubstitutionTemplateLiteral */) {
                            recordModuleName();
                            return true;
                        }
                    }
                    else if (token === 10 /* StringLiteral */) {
                        recordModuleName();
                        return true;
                    }
                    else {
                        if (token === 154 /* TypeKeyword */) {
                            const skipTypeKeyword = scanner.lookAhead(() => {
                                const token2 = scanner.scan();
                                return token2 !== 158 /* FromKeyword */ && (token2 === 41 /* AsteriskToken */ || token2 === 18 /* OpenBraceToken */ || token2 === 79 /* Identifier */ || isKeyword(token2));
                            });
                            if (skipTypeKeyword) {
                                token = nextToken();
                            }
                        }
                        if (token === 79 /* Identifier */ || isKeyword(token)) {
                            token = nextToken();
                            if (token === 158 /* FromKeyword */) {
                                token = nextToken();
                                if (token === 10 /* StringLiteral */) {
                                    recordModuleName();
                                    return true;
                                }
                            }
                            else if (token === 63 /* EqualsToken */) {
                                if (tryConsumeRequireCall(
                                /*skipCurrentToken*/
                                true)) {
                                    return true;
                                }
                            }
                            else if (token === 27 /* CommaToken */) {
                                token = nextToken();
                            }
                            else {
                                return true;
                            }
                        }
                        if (token === 18 /* OpenBraceToken */) {
                            token = nextToken();
                            while (token !== 19 /* CloseBraceToken */ && token !== 1 /* EndOfFileToken */) {
                                token = nextToken();
                            }
                            if (token === 19 /* CloseBraceToken */) {
                                token = nextToken();
                                if (token === 158 /* FromKeyword */) {
                                    token = nextToken();
                                    if (token === 10 /* StringLiteral */) {
                                        recordModuleName();
                                    }
                                }
                            }
                        }
                        else if (token === 41 /* AsteriskToken */) {
                            token = nextToken();
                            if (token === 128 /* AsKeyword */) {
                                token = nextToken();
                                if (token === 79 /* Identifier */ || isKeyword(token)) {
                                    token = nextToken();
                                    if (token === 158 /* FromKeyword */) {
                                        token = nextToken();
                                        if (token === 10 /* StringLiteral */) {
                                            recordModuleName();
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return true;
                }
                return false;
            }
            function tryConsumeExport() {
                let token = scanner.getToken();
                if (token === 93 /* ExportKeyword */) {
                    markAsExternalModuleIfTopLevel();
                    token = nextToken();
                    if (token === 154 /* TypeKeyword */) {
                        const skipTypeKeyword = scanner.lookAhead(() => {
                            const token2 = scanner.scan();
                            return token2 === 41 /* AsteriskToken */ || token2 === 18 /* OpenBraceToken */;
                        });
                        if (skipTypeKeyword) {
                            token = nextToken();
                        }
                    }
                    if (token === 18 /* OpenBraceToken */) {
                        token = nextToken();
                        while (token !== 19 /* CloseBraceToken */ && token !== 1 /* EndOfFileToken */) {
                            token = nextToken();
                        }
                        if (token === 19 /* CloseBraceToken */) {
                            token = nextToken();
                            if (token === 158 /* FromKeyword */) {
                                token = nextToken();
                                if (token === 10 /* StringLiteral */) {
                                    recordModuleName();
                                }
                            }
                        }
                    }
                    else if (token === 41 /* AsteriskToken */) {
                        token = nextToken();
                        if (token === 158 /* FromKeyword */) {
                            token = nextToken();
                            if (token === 10 /* StringLiteral */) {
                                recordModuleName();
                            }
                        }
                    }
                    else if (token === 100 /* ImportKeyword */) {
                        token = nextToken();
                        if (token === 154 /* TypeKeyword */) {
                            const skipTypeKeyword = scanner.lookAhead(() => {
                                const token2 = scanner.scan();
                                return token2 === 79 /* Identifier */ || isKeyword(token2);
                            });
                            if (skipTypeKeyword) {
                                token = nextToken();
                            }
                        }
                        if (token === 79 /* Identifier */ || isKeyword(token)) {
                            token = nextToken();
                            if (token === 63 /* EqualsToken */) {
                                if (tryConsumeRequireCall(
                                /*skipCurrentToken*/
                                true)) {
                                    return true;
                                }
                            }
                        }
                    }
                    return true;
                }
                return false;
            }
            function tryConsumeRequireCall(skipCurrentToken, allowTemplateLiterals = false) {
                let token = skipCurrentToken ? nextToken() : scanner.getToken();
                if (token === 147 /* RequireKeyword */) {
                    token = nextToken();
                    if (token === 20 /* OpenParenToken */) {
                        token = nextToken();
                        if (token === 10 /* StringLiteral */ || allowTemplateLiterals && token === 14 /* NoSubstitutionTemplateLiteral */) {
                            recordModuleName();
                        }
                    }
                    return true;
                }
                return false;
            }
            function tryConsumeDefine() {
                let token = scanner.getToken();
                if (token === 79 /* Identifier */ && scanner.getTokenValue() === "define") {
                    token = nextToken();
                    if (token !== 20 /* OpenParenToken */) {
                        return true;
                    }
                    token = nextToken();
                    if (token === 10 /* StringLiteral */ || token === 14 /* NoSubstitutionTemplateLiteral */) {
                        token = nextToken();
                        if (token === 27 /* CommaToken */) {
                            token = nextToken();
                        }
                        else {
                            return true;
                        }
                    }
                    if (token !== 22 /* OpenBracketToken */) {
                        return true;
                    }
                    token = nextToken();
                    while (token !== 23 /* CloseBracketToken */ && token !== 1 /* EndOfFileToken */) {
                        if (token === 10 /* StringLiteral */ || token === 14 /* NoSubstitutionTemplateLiteral */) {
                            recordModuleName();
                        }
                        token = nextToken();
                    }
                    return true;
                }
                return false;
            }
            function processImports() {
                scanner.setText(sourceText);
                nextToken();
                while (true) {
                    if (scanner.getToken() === 1 /* EndOfFileToken */) {
                        break;
                    }
                    if (scanner.getToken() === 15 /* TemplateHead */) {
                        const stack = [scanner.getToken()];
                        loop: while (length(stack)) {
                            const token = scanner.scan();
                            switch (token) {
                                case 1 /* EndOfFileToken */:
                                    break loop;
                                case 100 /* ImportKeyword */:
                                    tryConsumeImport();
                                    break;
                                case 15 /* TemplateHead */:
                                    stack.push(token);
                                    break;
                                case 18 /* OpenBraceToken */:
                                    if (length(stack)) {
                                        stack.push(token);
                                    }
                                    break;
                                case 19 /* CloseBraceToken */:
                                    if (length(stack)) {
                                        if (lastOrUndefined(stack) === 15 /* TemplateHead */) {
                                            if (scanner.reScanTemplateToken(
                                            /* isTaggedTemplate */
                                            false) === 17 /* TemplateTail */) {
                                                stack.pop();
                                            }
                                        }
                                        else {
                                            stack.pop();
                                        }
                                    }
                                    break;
                            }
                        }
                        nextToken();
                    }
                    if (tryConsumeDeclare() || tryConsumeImport() || tryConsumeExport() || detectJavaScriptImports && (tryConsumeRequireCall(
                    /*skipCurrentToken*/
                    false, 
                    /*allowTemplateLiterals*/
                    true) || tryConsumeDefine())) {
                        continue;
                    }
                    else {
                        nextToken();
                    }
                }
                scanner.setText(void 0);
            }
            if (readImportFiles) {
                processImports();
            }
            processCommentPragmas(pragmaContext, sourceText);
            processPragmasIntoFields(pragmaContext, noop);
            if (externalModule) {
                if (ambientExternalModules) {
                    for (const decl of ambientExternalModules) {
                        importedFiles.push(decl.ref);
                    }
                }
                return { referencedFiles: pragmaContext.referencedFiles, typeReferenceDirectives: pragmaContext.typeReferenceDirectives, libReferenceDirectives: pragmaContext.libReferenceDirectives, importedFiles, isLibFile: !!pragmaContext.hasNoDefaultLib, ambientExternalModules: void 0 };
            }
            else {
                let ambientModuleNames;
                if (ambientExternalModules) {
                    for (const decl of ambientExternalModules) {
                        if (decl.depth === 0) {
                            if (!ambientModuleNames) {
                                ambientModuleNames = [];
                            }
                            ambientModuleNames.push(decl.ref.fileName);
                        }
                        else {
                            importedFiles.push(decl.ref);
                        }
                    }
                }
                return { referencedFiles: pragmaContext.referencedFiles, typeReferenceDirectives: pragmaContext.typeReferenceDirectives, libReferenceDirectives: pragmaContext.libReferenceDirectives, importedFiles, isLibFile: !!pragmaContext.hasNoDefaultLib, ambientExternalModules: ambientModuleNames };
            }
        }