function isNotSupportingOn(node) {
        return aCase =>
            isNotSupportingVersion(aCase) &&
            (!aCase.test || aCase.test({ node, __proto__: testInfoPrototype }))
    }