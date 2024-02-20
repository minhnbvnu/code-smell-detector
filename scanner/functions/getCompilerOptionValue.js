function getCompilerOptionValue(options, option) {
            return option.strictFlag ? getStrictOptionValue(options, option.name) : options[option.name];
        }