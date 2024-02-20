function resolveUpstream(upstream) {
    let coreRulesetRegExp = /^solium:[a-z_]+$/;

    // Determine whether upstream is a solium core ruleset or a sharable config.
    if (coreRulesetRegExp.test(upstream)) {
        try {
            return require("../../config/rulesets/solium-" + upstream.split(":") [1]).rules;
        } catch (e) {
            throw new Error("\"" + upstream + "\" is not a core ruleset.");
        }
    }

    // If flow reaches here, it means upstream is a sharable config.
    let configName = constants.SOLIUM_SHARABLE_CONFIG_PREFIX + upstream, config;

    try {
        config = require(configName);
    } catch (e) {
        if (e.code === "MODULE_NOT_FOUND") {
            throw new Error(
                "The sharable config \"" + configName + "\" is not installed. " +
				"If Solium is installed globally, install the config globally using " +
				"\"npm install -g " + configName + "\". Else install locally using " +
				"\"npm install --save-dev " + configName + "\"."
            );
        }

        throw new Error("The sharable config \"" + configName + "\" could not be loaded: " + e.message);
    }

    if (isAValidSharableConfig(config)) {
        return config.rules;
    }

    throw new Error("Invalid sharable config \"" +
		configName + "\". AJV message:\n" + util.inspect(isAValidSharableConfig.errors));
}