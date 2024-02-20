function isSyntheticMetadataDecorator(node) {
                return isCallToHelper(node.expression, "___metadata");
            }