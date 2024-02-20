function emitComputedPropertyName(node) {
                const savedPrivateNameTempFlags = privateNameTempFlags;
                const savedReservedMemberNames = reservedPrivateNames;
                popPrivateNameGenerationScope();
                writePunctuation("[");
                emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfComputedPropertyName);
                writePunctuation("]");
                pushPrivateNameGenerationScope(savedPrivateNameTempFlags, savedReservedMemberNames);
            }