function normalizeRule(rule) {
        return typeof rule === "function" ? Object.assign({ create: rule }, rule) : rule;
    }