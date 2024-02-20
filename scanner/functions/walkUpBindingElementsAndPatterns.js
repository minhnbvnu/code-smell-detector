function walkUpBindingElementsAndPatterns(binding) {
            let node = binding.parent;
            while (isBindingElement(node.parent)) {
                node = node.parent.parent;
            }
            return node.parent;
        }