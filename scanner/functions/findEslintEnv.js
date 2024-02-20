function findEslintEnv(text) {
        let match, retv;
        eslintEnvPattern.lastIndex = 0;
        while ((match = eslintEnvPattern.exec(text)) !== null) {
            if (match[0].endsWith("*/")) {
                retv = Object.assign(retv || {}, commentParser.parseListConfig(extractDirectiveComment(match[1]).directivePart));
            }
        }
        return retv;
    }