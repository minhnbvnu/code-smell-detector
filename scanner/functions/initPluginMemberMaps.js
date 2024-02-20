function initPluginMemberMaps(elements, slots) {
        const processed = new Set();
        slots.envMap = new Map();
        slots.processorMap = new Map();
        slots.ruleMap = new Map();
        for (const element of elements) {
            if (!element.plugins) {
                continue;
            }
            for (const [pluginId, value] of Object.entries(element.plugins)) {
                const plugin = value.definition;
                if (!plugin || processed.has(pluginId)) {
                    continue;
                }
                processed.add(pluginId);
                collect(pluginId, plugin.environments, slots.envMap);
                collect(pluginId, plugin.processors, slots.processorMap);
                collect(pluginId, plugin.rules, slots.ruleMap, normalizePluginRule);
            }
        }
        deleteMutationMethods(slots.envMap);
        deleteMutationMethods(slots.processorMap);
        deleteMutationMethods(slots.ruleMap);
    }