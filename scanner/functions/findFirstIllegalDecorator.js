function findFirstIllegalDecorator(node) {
                return canHaveIllegalDecorators(node) ? find(node.modifiers, isDecorator) : void 0;
            }