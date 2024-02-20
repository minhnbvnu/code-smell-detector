function isArrayBindingElement(node) {
            const kind = node.kind;
            return kind === 205 /* BindingElement */ || kind === 229 /* OmittedExpression */;
        }