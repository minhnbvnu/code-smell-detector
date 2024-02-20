function markTypeNodeAsReferenced(node) {
                markEntityNameOrEntityExpressionAsReference(node && getEntityNameFromTypeNode(node), 
                /*forDecoratorMetadata*/
                false);
            }