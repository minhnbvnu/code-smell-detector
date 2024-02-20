function visitCommaListElements(elements, visitor, discardVisitor = visitor) {
            if (discardVisitor === visitor || elements.length <= 1) {
                return visitNodes2(elements, visitor, isExpression);
            }
            let i = 0;
            const length2 = elements.length;
            return visitNodes2(elements, (node) => {
                const discarded = i < length2 - 1;
                i++;
                return discarded ? discardVisitor(node) : visitor(node);
            }, isExpression);
        }