function getInfo3(program, sourceFile, span) {
            const diag2 = find(program.getSemanticDiagnostics(sourceFile), (diag3) => diag3.start === span.start && diag3.length === span.length);
            if (diag2 === void 0 || diag2.relatedInformation === void 0)
                return;
            const related = find(diag2.relatedInformation, (related2) => related2.code === Diagnostics.This_type_parameter_might_need_an_extends_0_constraint.code);
            if (related === void 0 || related.file === void 0 || related.start === void 0 || related.length === void 0)
                return;
            let declaration = findAncestorMatchingSpan(related.file, createTextSpan(related.start, related.length));
            if (declaration === void 0)
                return;
            if (isIdentifier(declaration) && isTypeParameterDeclaration(declaration.parent)) {
                declaration = declaration.parent;
            }
            if (isTypeParameterDeclaration(declaration)) {
                if (isMappedTypeNode(declaration.parent))
                    return;
                const token = getTokenAtPosition(sourceFile, span.start);
                const checker = program.getTypeChecker();
                const constraint = tryGetConstraintType(checker, token) || tryGetConstraintFromDiagnosticMessage(related.messageText);
                return { constraint, declaration, token };
            }
            return void 0;
        }