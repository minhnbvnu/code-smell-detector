function getDestructuringPropertyName(node) {
                const parent2 = node.parent;
                if (node.kind === 205 /* BindingElement */ && parent2.kind === 203 /* ObjectBindingPattern */) {
                    return getLiteralPropertyNameText(node.propertyName || node.name);
                }
                if (node.kind === 299 /* PropertyAssignment */ || node.kind === 300 /* ShorthandPropertyAssignment */) {
                    return getLiteralPropertyNameText(node.name);
                }
                return "" + parent2.elements.indexOf(node);
            }