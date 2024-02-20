function normalizePluginRule(rule) {
        return typeof rule === "function" ? { create: rule } : rule;
    }