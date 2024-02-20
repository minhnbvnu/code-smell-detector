function markDecoratorMedataDataTypeNodeAsReferenced(node) {
                const entityName = getEntityNameForDecoratorMetadata(node);
                if (entityName && isEntityName(entityName)) {
                    markEntityNameOrEntityExpressionAsReference(entityName, 
                    /*forDecoratorMetadata*/
                    true);
                }
            }