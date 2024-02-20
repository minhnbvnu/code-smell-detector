function RuleCreator(urlCreator) {
        // This function will get much easier to call when this is merged https://github.com/Microsoft/TypeScript/pull/26349
        // TODO - when the above PR lands; add type checking for the context.report `data` property
        return function createNamedRule(_a) {
            var { name, meta } = _a, rule = __rest(_a, ["name", "meta"]);
            return createRule(Object.assign({ meta: Object.assign(Object.assign({}, meta), { docs: Object.assign(Object.assign({}, meta.docs), { url: urlCreator(name) }) }) }, rule));
        };
    }