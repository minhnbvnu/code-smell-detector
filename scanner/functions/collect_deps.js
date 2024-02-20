function collect_deps(source) {
        function traverse(node) {
            if (is_require(node)) {
                const [arg] = node.arguments;
                if (typescript_1.default.isStringLiteral(arg) && arg.text.length > 0)
                    deps.add(arg.text);
            }
            typescript_1.default.forEachChild(node, traverse);
        }
        const deps = new Set();
        traverse(source);
        return [...deps];
    }