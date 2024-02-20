function getContextualTypeForDecorator(decorator) {
                const signature = getDecoratorCallSignature(decorator);
                return signature ? getOrCreateTypeFromSignature(signature) : void 0;
            }