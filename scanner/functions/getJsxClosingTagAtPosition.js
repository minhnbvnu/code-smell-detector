function getJsxClosingTagAtPosition(fileName, position) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const token = findPrecedingToken(position, sourceFile);
                if (!token)
                    return void 0;
                const element = token.kind === 31 /* GreaterThanToken */ && isJsxOpeningElement(token.parent) ? token.parent.parent : isJsxText(token) && isJsxElement(token.parent) ? token.parent : void 0;
                if (element && isUnclosedTag(element)) {
                    return { newText: `</${element.openingElement.tagName.getText(sourceFile)}>` };
                }
                const fragment = token.kind === 31 /* GreaterThanToken */ && isJsxOpeningFragment(token.parent) ? token.parent.parent : isJsxText(token) && isJsxFragment(token.parent) ? token.parent : void 0;
                if (fragment && isUnclosedFragment(fragment)) {
                    return { newText: "</>" };
                }
            }