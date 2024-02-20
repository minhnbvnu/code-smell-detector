function getRollupObject ({
    input, minifying, environment,
    // eslint-disable-next-line no-shadow
    external,
    format = 'umd'
}) {
    const nonMinified = {
        input,
        external,
        output: {
            format,
            sourcemap: minifying,
            file: `dist/index${environment ? `-${environment}` : ''}-${
                format
            }${minifying ? '.min' : ''}.${
                format === 'esm' ? '' : 'c'
            }js`,
            name: 'JSONPath'
        },
        plugins: [
            babel({
                babelrc: false,
                presets: [
                    environment === 'node'
                        ? ['@babel/preset-env', {
                            targets: [
                                `node ${pkg.engines.node}`
                            ]
                        }]
                        // Can come up with some browser targets
                        : ['@babel/preset-env']
                ],
                babelHelpers: 'bundled'
            })
        ]
    };
    if (minifying) {
        nonMinified.plugins.push(terser());
    }
    return nonMinified;
}