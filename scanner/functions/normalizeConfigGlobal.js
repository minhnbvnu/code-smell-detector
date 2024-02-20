function normalizeConfigGlobal(configuredValue) {
        switch (configuredValue) {
            case "off":
                return "off";
            case true:
            case "true":
            case "writeable":
            case "writable":
                return "writable";
            case null:
            case false:
            case "false":
            case "readable":
            case "readonly":
                return "readonly";
            default:
                throw new Error(`'${configuredValue}' is not a valid configuration for a global (use 'readonly', 'writable', or 'off')`);
        }
    }