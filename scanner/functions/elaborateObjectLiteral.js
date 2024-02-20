function elaborateObjectLiteral(node, source, target, relation, containingMessageChain, errorOutputContainer) {
                if (target.flags & (134348796 /* Primitive */ | 131072 /* Never */))
                    return false;
                return elaborateElementwise(generateObjectLiteralElements(node), source, target, relation, containingMessageChain, errorOutputContainer);
            }