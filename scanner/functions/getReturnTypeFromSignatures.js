function getReturnTypeFromSignatures(signatures, checker, context, enclosingDeclaration) {
            if (length(signatures)) {
                const type = checker.getUnionType(map(signatures, checker.getReturnTypeOfSignature));
                return checker.typeToTypeNode(type, enclosingDeclaration, 1 /* NoTruncation */, getNoopSymbolTrackerWithResolver(context));
            }
        }