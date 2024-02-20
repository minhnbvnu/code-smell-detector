function isPossiblyTypeArgumentPosition(token, sourceFile, checker) {
            const info = getPossibleTypeArgumentsInfo(token, sourceFile);
            return info !== void 0 && (isPartOfTypeNode(info.called) || getPossibleGenericSignatures(info.called, info.nTypeArguments, checker).length !== 0 || isPossiblyTypeArgumentPosition(info.called, sourceFile, checker));
        }