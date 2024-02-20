function convertPattern(retv, pattern) {
    let i = 0

    // If this test is on script mode, it should do this test on module mode as well.
    if (
        !pattern.modules &&
        pattern.code.indexOf("'use strict'") !== 0 &&
        pattern.name.indexOf("non-strict") === -1
    ) {
        convertPattern(
            retv,
            Object.create(pattern, { modules: { value: true } })
        )
    }

    // Creates error messages.
    const errors = []
    for (i = 0; i < pattern.errors; ++i) {
        errors.push(
            `${pattern.name} ${
                pattern.singular ? "is" : "are"
            } not supported yet on Node `
        )
    }

    // Creates each pattern of Node versions.
    for (const version of VERSION_MAP.keys()) {
        const versionText = VERSION_MAP.get(version)

        // Skips if ignored
        if (pattern.ignores && pattern.ignores.indexOf(version) !== -1) {
            continue
        }

        if (version >= pattern.supported) {
            // If this is supported, add to a valid pattern.
            retv.valid.push({
                code: `/*${pattern.name}: ${versionText}*/ ${pattern.code}`,
                env: { es6: true },
                globals: { SharedArrayBuffer: false, Atomics: false },
                options: [version],
                parserOptions: {
                    ecmaVersion: 2018,
                    sourceType: pattern.modules ? "module" : "script",
                },
            })
        } else {
            // If this is not supported, add to a valid pattern with a "ignores" option.
            ;[].push.apply(
                retv.valid,
                pattern.keys.map(key => ({
                    code: `/*${
                        pattern.name
                    }: ${versionText}, ignores: ["${key}"]*/ ${pattern.code}`,
                    env: { es6: true },
                    globals: { SharedArrayBuffer: false, Atomics: false },
                    options: [{ version, ignores: [key] }],
                    parserOptions: {
                        ecmaVersion: 2018,
                        sourceType: pattern.modules ? "module" : "script",
                    },
                }))
            )

            // If this is not supported, add to a invalid pattern.
            retv.invalid.push({
                code: `/*${pattern.name}: ${versionText}*/ ${pattern.code}`,
                env: { es6: true },
                globals: { SharedArrayBuffer: false, Atomics: false },
                options: [version],
                parserOptions: {
                    ecmaVersion: 2018,
                    sourceType: pattern.modules ? "module" : "script",
                },
                errors: errors.map(message => `${message + versionText}.`),
            })
        }
    }

    return retv
}