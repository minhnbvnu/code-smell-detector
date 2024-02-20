function getConvertableOverloadListAtPosition(file, startPosition, program) {
            const node = getTokenAtPosition(file, startPosition);
            const containingDecl = findAncestor(node, isConvertableSignatureDeclaration);
            if (!containingDecl) {
                return;
            }
            if (isFunctionLikeDeclaration(containingDecl) && containingDecl.body && rangeContainsPosition(containingDecl.body, startPosition)) {
                return;
            }
            const checker = program.getTypeChecker();
            const signatureSymbol = containingDecl.symbol;
            if (!signatureSymbol) {
                return;
            }
            const decls = signatureSymbol.declarations;
            if (length(decls) <= 1) {
                return;
            }
            if (!every(decls, (d) => getSourceFileOfNode(d) === file)) {
                return;
            }
            if (!isConvertableSignatureDeclaration(decls[0])) {
                return;
            }
            const kindOne = decls[0].kind;
            if (!every(decls, (d) => d.kind === kindOne)) {
                return;
            }
            const signatureDecls = decls;
            if (some(signatureDecls, (d) => !!d.typeParameters || some(d.parameters, (p) => !!p.modifiers || !isIdentifier(p.name)))) {
                return;
            }
            const signatures = mapDefined(signatureDecls, (d) => checker.getSignatureFromDeclaration(d));
            if (length(signatures) !== length(decls)) {
                return;
            }
            const returnOne = checker.getReturnTypeOfSignature(signatures[0]);
            if (!every(signatures, (s) => checker.getReturnTypeOfSignature(s) === returnOne)) {
                return;
            }
            return signatureDecls;
        }