function getRegularExpressionsForWildcards(specs, basePath, usage) {
            if (specs === void 0 || specs.length === 0) {
                return void 0;
            }
            return flatMap(specs, (spec) => spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]));
        }