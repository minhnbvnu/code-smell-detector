function isNodeValidTSType(node) {
                return (isNodeReadonlyTSTypeOperator(node) ||
                    isNodeValidArrayTSTypeReference(node));
            }