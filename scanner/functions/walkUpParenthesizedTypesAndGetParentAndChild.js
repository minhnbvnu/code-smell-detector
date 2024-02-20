function walkUpParenthesizedTypesAndGetParentAndChild(node) {
            let child;
            while (node && node.kind === 193 /* ParenthesizedType */) {
                child = node;
                node = node.parent;
            }
            return [child, node];
        }