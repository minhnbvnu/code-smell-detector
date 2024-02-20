function isStrictCompilerOptionEnabled(options, option) {
        return (options.strict ? options[option] !== false : options[option] === true) &&
            (option !== 'strictPropertyInitialization' || isStrictCompilerOptionEnabled(options, 'strictNullChecks'));
    }