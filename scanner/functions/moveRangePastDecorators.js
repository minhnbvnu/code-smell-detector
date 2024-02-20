function moveRangePastDecorators(node) {
            const lastDecorator = canHaveModifiers(node) ? findLast(node.modifiers, isDecorator) : void 0;
            return lastDecorator && !positionIsSynthesized(lastDecorator.end) ? moveRangePos(node, lastDecorator.end) : node;
        }