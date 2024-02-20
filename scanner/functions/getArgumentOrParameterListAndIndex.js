function getArgumentOrParameterListAndIndex(node, sourceFile) {
            if (node.kind === 29 /* LessThanToken */ || node.kind === 20 /* OpenParenToken */) {
                return { list: getChildListThatStartsWithOpenerToken(node.parent, node, sourceFile), argumentIndex: 0 };
            }
            else {
                const list = findContainingList(node);
                return list && { list, argumentIndex: getArgumentIndex(list, node) };
            }
        }