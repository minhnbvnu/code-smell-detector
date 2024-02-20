function optionMapToObject(optionMap) {
            return {
                ...arrayFrom(optionMap.entries()).reduce((prev, cur) => ({ ...prev, [cur[0]]: cur[1] }), {})
            };
        }