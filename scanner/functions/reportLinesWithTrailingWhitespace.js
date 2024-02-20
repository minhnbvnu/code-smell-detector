function reportLinesWithTrailingWhitespace(emitted) {
        if (emitted.exit) {
            return;
        }

        // Call getSourceCode() inside the handler function.
        // This is because comments array is not populated before
        // a rule's create() is called.
        // So if SourceCode object is obtained directly inside create(),
        // comments array will always be empty.
        const sourceCode = context.getSourceCode();

        const { node } = emitted,
            codeLines = sourceCode.getLines(),
            comments = sourceCode.getComments();

        const options = (context.options && context.options[0]) || {},
            skipBlankLines = options.skipBlankLines || false,
            ignoreComments = options.ignoreComments || false;

        codeLines.forEach((line, i) => {
            if (
                (skipBlankLines && isBlankLine(line)) ||
                (ignoreComments && isLineInsideAComment(line, i+1, comments, sourceCode))
            ) {
                return;
            }

            const clean = line.trimRight();

            // TODO: Add fix capability
            // This requires us to know the start index of the code
            // on the flagged line. This index will be used to supply
            // a range that will be replaced with the fixed code.
            const issue = {
                node,
                location: {
                    line: i+1,
                    column: line.length - clean.length
                },
                message: "Line contains trailing whitespace"
            };

            if (line !== clean) {
                context.report(issue);
            }
        });
    }