function getTokenAtPosition(sourceFile, position) {
        const queue = [sourceFile];
        let current;
        while (queue.length > 0) {
            current = queue.shift();
            // find the child that contains 'position'
            for (const child of current.getChildren(sourceFile)) {
                const start = child.getFullStart();
                if (start > position) {
                    // If this child begins after position, then all subsequent children will as well.
                    return current;
                }
                const end = child.getEnd();
                if (position < end ||
                    (position === end && child.kind === ts.SyntaxKind.EndOfFileToken)) {
                    queue.push(child);
                    break;
                }
            }
        }
        return current;
    }