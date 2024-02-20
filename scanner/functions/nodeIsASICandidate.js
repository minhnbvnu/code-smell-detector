function nodeIsASICandidate(node, sourceFile) {
            const lastToken = node.getLastToken(sourceFile);
            if (lastToken && lastToken.kind === 26 /* SemicolonToken */) {
                return false;
            }
            if (syntaxRequiresTrailingCommaOrSemicolonOrASI(node.kind)) {
                if (lastToken && lastToken.kind === 27 /* CommaToken */) {
                    return false;
                }
            }
            else if (syntaxRequiresTrailingModuleBlockOrSemicolonOrASI(node.kind)) {
                const lastChild = last(node.getChildren(sourceFile));
                if (lastChild && isModuleBlock(lastChild)) {
                    return false;
                }
            }
            else if (syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(node.kind)) {
                const lastChild = last(node.getChildren(sourceFile));
                if (lastChild && isFunctionBlock(lastChild)) {
                    return false;
                }
            }
            else if (!syntaxRequiresTrailingSemicolonOrASI(node.kind)) {
                return false;
            }
            if (node.kind === 243 /* DoStatement */) {
                return true;
            }
            const topNode = findAncestor(node, (ancestor) => !ancestor.parent);
            const nextToken = findNextToken(node, topNode, sourceFile);
            if (!nextToken || nextToken.kind === 19 /* CloseBraceToken */) {
                return true;
            }
            const startLine = sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line;
            const endLine = sourceFile.getLineAndCharacterOfPosition(nextToken.getStart(sourceFile)).line;
            return startLine !== endLine;
        }