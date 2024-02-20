function getRollupObjectByEnv ({minifying, environment}) {
    const input = `src/jsonpath-${environment}.js`;
    if (environment === 'node') {
        // eslint-disable-next-line no-shadow
        const external = ['vm'];
        return [
            getRollupObject({
                input, minifying, environment, external, format: 'cjs'
            }),
            getRollupObject({
                input, minifying, environment, external, format: 'esm'
            })
        ];
    }
    return [
        getRollupObject({input, minifying, environment, format: 'umd'}),
        getRollupObject({input, minifying, environment, format: 'esm'})
    ];
}