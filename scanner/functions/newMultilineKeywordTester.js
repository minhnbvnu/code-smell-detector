function newMultilineKeywordTester(keyword) {
        return {
            test(node, sourceCode) {
                return (node.loc.start.line !== node.loc.end.line &&
                    sourceCode.getFirstToken(node).value === keyword);
            },
        };
    }