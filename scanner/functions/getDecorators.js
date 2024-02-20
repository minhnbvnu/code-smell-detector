function getDecorators(node) {
        var _a;
        if (node == null) {
            return undefined;
        }
        if (isAtLeast48) {
            // eslint-disable-next-line deprecation/deprecation -- this is safe as it's guarded
            if (ts.canHaveDecorators(node)) {
                // eslint-disable-next-line deprecation/deprecation -- this is safe as it's guarded
                const decorators = ts.getDecorators(node);
                return decorators ? Array.from(decorators) : undefined;
            }
            return undefined;
        }
        return (
        // @ts-expect-error intentional fallback for older TS versions
        (_a = node.decorators) === null || _a === void 0 ? void 0 : _a.filter(ts.isDecorator));
    }