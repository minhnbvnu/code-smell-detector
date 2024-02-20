function getSingleLineReplacementSpanForImportCompletionNode(node) {
            var _a2, _b, _c;
            if (!node)
                return void 0;
            const top = (_a2 = findAncestor(node, or(isImportDeclaration, isImportEqualsDeclaration))) != null ? _a2 : node;
            const sourceFile = top.getSourceFile();
            if (rangeIsOnSingleLine(top, sourceFile)) {
                return createTextSpanFromNode(top, sourceFile);
            }
            Debug.assert(top.kind !== 100 /* ImportKeyword */ && top.kind !== 273 /* ImportSpecifier */);
            const potentialSplitPoint = top.kind === 269 /* ImportDeclaration */ ? (_c = getPotentiallyInvalidImportSpecifier((_b = top.importClause) == null ? void 0 : _b.namedBindings)) != null ? _c : top.moduleSpecifier : top.moduleReference;
            const withoutModuleSpecifier = {
                pos: top.getFirstToken().getStart(),
                end: potentialSplitPoint.pos
            };
            if (rangeIsOnSingleLine(withoutModuleSpecifier, sourceFile)) {
                return createTextSpanFromRange(withoutModuleSpecifier);
            }
        }