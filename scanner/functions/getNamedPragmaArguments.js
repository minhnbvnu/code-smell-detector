function getNamedPragmaArguments(pragma, text) {
            if (!text)
                return {};
            if (!pragma.args)
                return {};
            const args = trimString(text).split(/\s+/);
            const argMap = {};
            for (let i = 0; i < pragma.args.length; i++) {
                const argument = pragma.args[i];
                if (!args[i] && !argument.optional) {
                    return "fail";
                }
                if (argument.captureSpan) {
                    return Debug.fail("Capture spans not yet implemented for non-xml pragmas");
                }
                argMap[argument.name] = args[i];
            }
            return argMap;
        }