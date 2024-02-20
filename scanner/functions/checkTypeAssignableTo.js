function checkTypeAssignableTo(source, target, errorNode, headMessage, containingMessageChain, errorOutputObject) {
                return checkTypeRelatedTo(source, target, assignableRelation, errorNode, headMessage, containingMessageChain, errorOutputObject);
            }