function createMetadataHelper(metadataKey, metadataValue) {
                context.requestEmitHelper(metadataHelper);
                return factory2.createCallExpression(getUnscopedHelperName("__metadata"), 
                /*typeArguments*/
                void 0, [
                    factory2.createStringLiteral(metadataKey),
                    metadataValue
                ]);
            }