function getConditions(options, esmMode) {
            const conditions = esmMode || getEmitModuleResolutionKind(options) === 100 /* Bundler */ ? ["import"] : ["require"];
            if (!options.noDtsResolution) {
                conditions.push("types");
            }
            if (getEmitModuleResolutionKind(options) !== 100 /* Bundler */) {
                conditions.push("node");
            }
            return concatenate(conditions, options.customConditions);
        }