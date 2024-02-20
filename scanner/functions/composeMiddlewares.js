function composeMiddlewares(middleware) {
    return function wrapMiddlewares(ctx) {
        let index = -1;
        function dispatch(i) {
            index = i;
            const fn = middleware[i];
            if (!fn) {
                return Promise.resolve();
            }
            return Promise.resolve(
                fn(ctx, () => dispatch(i + 1))
            )
        }
        return dispatch(0);
    }
}