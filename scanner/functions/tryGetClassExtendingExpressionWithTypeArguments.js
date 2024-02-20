function tryGetClassExtendingExpressionWithTypeArguments(node) {
            const cls = tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
            return cls && !cls.isImplements ? cls.class : void 0;
        }