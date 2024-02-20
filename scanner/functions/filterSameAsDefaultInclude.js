function filterSameAsDefaultInclude(specs) {
            if (!length(specs))
                return void 0;
            if (length(specs) !== 1)
                return specs;
            if (specs[0] === defaultIncludeSpec)
                return void 0;
            return specs;
        }