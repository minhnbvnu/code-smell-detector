function updateJsxFragment(node, openingFragment, children, closingFragment) {
                return node.openingFragment !== openingFragment || node.children !== children || node.closingFragment !== closingFragment ? update(createJsxFragment(openingFragment, children, closingFragment), node) : node;
            }