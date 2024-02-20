function formatStringFromArgs(text, args, baseIndex = 0) {
            return text.replace(/{(\d+)}/g, (_match, index) => "" + Debug.checkDefined(args[+index + baseIndex]));
        }