function elideNodes(factory2, nodes) {
            if (nodes === void 0)
                return void 0;
            if (nodes.length === 0)
                return nodes;
            return setTextRange(factory2.createNodeArray([], nodes.hasTrailingComma), nodes);
        }