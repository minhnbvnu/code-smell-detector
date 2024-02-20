function getDecoratorCallSignature(decorator) {
                return legacyDecorators ? getLegacyDecoratorCallSignature(decorator) : getESDecoratorCallSignature(decorator);
            }