function checkTypeRelatedToAndOptionallyElaborate(source, target, relation, errorNode, expr, headMessage, containingMessageChain, errorOutputContainer) {
                if (isTypeRelatedTo(source, target, relation))
                    return true;
                if (!errorNode || !elaborateError(expr, source, target, relation, headMessage, containingMessageChain, errorOutputContainer)) {
                    return checkTypeRelatedTo(source, target, relation, errorNode, headMessage, containingMessageChain, errorOutputContainer);
                }
                return false;
            }