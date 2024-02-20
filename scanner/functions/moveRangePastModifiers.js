function moveRangePastModifiers(node) {
            if (isPropertyDeclaration(node) || isMethodDeclaration(node)) {
                return moveRangePos(node, node.name.pos);
            }
            const lastModifier = canHaveModifiers(node) ? lastOrUndefined(node.modifiers) : void 0;
            return lastModifier && !positionIsSynthesized(lastModifier.end) ? moveRangePos(node, lastModifier.end) : moveRangePastDecorators(node);
        }