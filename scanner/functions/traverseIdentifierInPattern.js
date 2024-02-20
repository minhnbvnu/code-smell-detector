function traverseIdentifierInPattern(options, rootPattern, referencer, callback) {
        // Call the callback at left hand identifier nodes, and Collect right hand nodes.
        const visitor = new PatternVisitor(options, rootPattern, callback);
        visitor.visit(rootPattern);
        // Process the right hand nodes recursively.
        if (referencer !== null && referencer !== undefined) {
            visitor.rightHandNodes.forEach(referencer.visit, referencer);
        }
    }