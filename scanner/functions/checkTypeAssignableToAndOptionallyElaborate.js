function checkTypeAssignableToAndOptionallyElaborate(source, target, errorNode, expr, headMessage, containingMessageChain) {
                return checkTypeRelatedToAndOptionallyElaborate(source, target, assignableRelation, errorNode, expr, headMessage, containingMessageChain, 
                /*errorOutputContainer*/
                void 0);
            }