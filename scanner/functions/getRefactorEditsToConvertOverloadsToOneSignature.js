function getRefactorEditsToConvertOverloadsToOneSignature(context) {
            const { file, startPosition, program } = context;
            const signatureDecls = getConvertableOverloadListAtPosition(file, startPosition, program);
            if (!signatureDecls)
                return void 0;
            const checker = program.getTypeChecker();
            const lastDeclaration = signatureDecls[signatureDecls.length - 1];
            let updated = lastDeclaration;
            switch (lastDeclaration.kind) {
                case 170 /* MethodSignature */: {
                    updated = factory.updateMethodSignature(lastDeclaration, lastDeclaration.modifiers, lastDeclaration.name, lastDeclaration.questionToken, lastDeclaration.typeParameters, getNewParametersForCombinedSignature(signatureDecls), lastDeclaration.type);
                    break;
                }
                case 171 /* MethodDeclaration */: {
                    updated = factory.updateMethodDeclaration(lastDeclaration, lastDeclaration.modifiers, lastDeclaration.asteriskToken, lastDeclaration.name, lastDeclaration.questionToken, lastDeclaration.typeParameters, getNewParametersForCombinedSignature(signatureDecls), lastDeclaration.type, lastDeclaration.body);
                    break;
                }
                case 176 /* CallSignature */: {
                    updated = factory.updateCallSignature(lastDeclaration, lastDeclaration.typeParameters, getNewParametersForCombinedSignature(signatureDecls), lastDeclaration.type);
                    break;
                }
                case 173 /* Constructor */: {
                    updated = factory.updateConstructorDeclaration(lastDeclaration, lastDeclaration.modifiers, getNewParametersForCombinedSignature(signatureDecls), lastDeclaration.body);
                    break;
                }
                case 177 /* ConstructSignature */: {
                    updated = factory.updateConstructSignature(lastDeclaration, lastDeclaration.typeParameters, getNewParametersForCombinedSignature(signatureDecls), lastDeclaration.type);
                    break;
                }
                case 259 /* FunctionDeclaration */: {
                    updated = factory.updateFunctionDeclaration(lastDeclaration, lastDeclaration.modifiers, lastDeclaration.asteriskToken, lastDeclaration.name, lastDeclaration.typeParameters, getNewParametersForCombinedSignature(signatureDecls), lastDeclaration.type, lastDeclaration.body);
                    break;
                }
                default:
                    return Debug.failBadSyntaxKind(lastDeclaration, "Unhandled signature kind in overload list conversion refactoring");
            }
            if (updated === lastDeclaration) {
                return;
            }
            const edits = ts_textChanges_exports.ChangeTracker.with(context, (t) => {
                t.replaceNodeRange(file, signatureDecls[0], signatureDecls[signatureDecls.length - 1], updated);
            });
            return { renameFilename: void 0, renameLocation: void 0, edits };
            function getNewParametersForCombinedSignature(signatureDeclarations) {
                const lastSig = signatureDeclarations[signatureDeclarations.length - 1];
                if (isFunctionLikeDeclaration(lastSig) && lastSig.body) {
                    signatureDeclarations = signatureDeclarations.slice(0, signatureDeclarations.length - 1);
                }
                return factory.createNodeArray([
                    factory.createParameterDeclaration(
                    /*modifiers*/
                    void 0, factory.createToken(25 /* DotDotDotToken */), "args", 
                    /*questionToken*/
                    void 0, factory.createUnionTypeNode(map(signatureDeclarations, convertSignatureParametersToTuple)))
                ]);
            }
            function convertSignatureParametersToTuple(decl) {
                const members = map(decl.parameters, convertParameterToNamedTupleMember);
                return setEmitFlags(factory.createTupleTypeNode(members), some(members, (m) => !!length(getSyntheticLeadingComments(m))) ? 0 /* None */ : 1 /* SingleLine */);
            }
            function convertParameterToNamedTupleMember(p) {
                Debug.assert(isIdentifier(p.name));
                const result = setTextRange(factory.createNamedTupleMember(p.dotDotDotToken, p.name, p.questionToken, p.type || factory.createKeywordTypeNode(131 /* AnyKeyword */)), p);
                const parameterDocComment = p.symbol && p.symbol.getDocumentationComment(checker);
                if (parameterDocComment) {
                    const newComment = displayPartsToString(parameterDocComment);
                    if (newComment.length) {
                        setSyntheticLeadingComments(result, [{
                                text: `*
${newComment.split("\n").map((c) => ` * ${c}`).join("\n")}
 `,
                                kind: 3 /* MultiLineCommentTrivia */,
                                pos: -1,
                                end: -1,
                                hasTrailingNewLine: true,
                                hasLeadingNewline: true
                            }]);
                    }
                }
                return result;
            }
        }