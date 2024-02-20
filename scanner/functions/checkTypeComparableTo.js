function checkTypeComparableTo(source, target, errorNode, headMessage, containingMessageChain) {
                return checkTypeRelatedTo(source, target, comparableRelation, errorNode, headMessage, containingMessageChain);
            }