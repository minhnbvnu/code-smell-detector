function parseJsDocWorker(node, nodeStart, sourceFile, considerTrailingComments) {
        const start = ts[considerTrailingComments && isSameLine(sourceFile, node.pos, nodeStart)
            ? 'forEachTrailingCommentRange'
            : 'forEachLeadingCommentRange'](sourceFile.text, node.pos, 
        // return object to make `0` a truthy value
        (pos, _end, kind) => kind === ts.SyntaxKind.MultiLineCommentTrivia && sourceFile.text[pos + 2] === '*' ? { pos } : undefined);
        if (start === undefined)
            return [];
        const startPos = start.pos;
        const text = sourceFile.text.slice(startPos, nodeStart);
        const newSourceFile = ts.createSourceFile('jsdoc.ts', `${text}var a;`, sourceFile.languageVersion);
        const result = getJsDoc(newSourceFile.statements[0], newSourceFile);
        for (const doc of result)
            updateNode(doc, node);
        return result;
        function updateNode(n, parent) {
            n.pos += startPos;
            n.end += startPos;
            n.parent = parent;
            return ts.forEachChild(n, (child) => updateNode(child, n), (children) => {
                children.pos += startPos;
                children.end += startPos;
                for (const child of children)
                    updateNode(child, n);
            });
        }
    }