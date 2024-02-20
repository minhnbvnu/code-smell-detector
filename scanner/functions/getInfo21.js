function getInfo21(context) {
            if (isInJSFile(context.file) || !refactorKindBeginsWith(inferReturnTypeAction.kind, context.kind))
                return;
            const token = getTokenAtPosition(context.file, context.startPosition);
            const declaration = findAncestor(token, (n) => isBlock(n) || n.parent && isArrowFunction(n.parent) && (n.kind === 38 /* EqualsGreaterThanToken */ || n.parent.body === n) ? "quit" : isConvertibleDeclaration(n));
            if (!declaration || !declaration.body || declaration.type) {
                return { error: getLocaleSpecificMessage(Diagnostics.Return_type_must_be_inferred_from_a_function) };
            }
            const typeChecker = context.program.getTypeChecker();
            const returnType = tryGetReturnType(typeChecker, declaration);
            if (!returnType) {
                return { error: getLocaleSpecificMessage(Diagnostics.Could_not_determine_function_return_type) };
            }
            const returnTypeNode = typeChecker.typeToTypeNode(returnType, declaration, 1 /* NoTruncation */);
            if (returnTypeNode) {
                return { declaration, returnTypeNode };
            }
        }