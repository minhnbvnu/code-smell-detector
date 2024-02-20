function getInfo18(sourceFile, pos, _) {
            const node = getTokenAtPosition(sourceFile, pos);
            return node.kind === 26 /* SemicolonToken */ && node.parent && (isObjectLiteralExpression(node.parent) || isArrayLiteralExpression(node.parent)) ? { node } : void 0;
        }