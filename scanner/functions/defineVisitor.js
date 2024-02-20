function defineVisitor(context, options) {
    const testInfoPrototype = {
        get isStrict() {
            return normalizeScope(context.getScope(), this.node).isStrict
        },
    }

    /**
     * Check whether a given case object is full-supported on the configured node version.
     * @param {{supported:string}} aCase The case object to check.
     * @returns {boolean} `true` if it's supporting.
     */
    function isNotSupportingVersion(aCase) {
        return (
            !aCase.supported ||
            options.version.intersects(getSemverRange(`<${aCase.supported}`))
        )
    }

    /**
     * Define the predicate function to check whether a given case object is supported on the configured node version.
     * @param {Node} node The node which is reported.
     * @returns {function(aCase:{supported:string}):boolean} The predicate function.
     */
    function isNotSupportingOn(node) {
        return aCase =>
            isNotSupportingVersion(aCase) &&
            (!aCase.test || aCase.test({ node, __proto__: testInfoPrototype }))
    }

    return (
        keywords
            // Omit full-supported features and ignored features by options
            // because this rule never reports those.
            .filter(
                keyword =>
                    !options.ignores.has(keyword) &&
                    features[keyword].cases.some(isNotSupportingVersion)
            )
            // Merge remaining features with overriding `context.report()`.
            .reduce((visitor, keyword) => {
                const { ruleId, cases } = features[keyword]
                const rule = esRules[ruleId]
                const thisContext = {
                    __proto__: context,

                    // Override `context.report()` then:
                    // - ignore if it's supported.
                    // - override reporting messages.
                    report(descriptor) {
                        // Set additional information.
                        if (descriptor.data) {
                            descriptor.data.version = options.version.raw
                        } else {
                            descriptor.data = { version: options.version.raw }
                        }
                        descriptor.fix = undefined

                        // Test and report.
                        const node = descriptor.node
                        const hitCase = cases.find(isNotSupportingOn(node))
                        if (hitCase) {
                            descriptor.messageId = hitCase.messageId
                            descriptor.data.supported = hitCase.supported
                            super.report(descriptor)
                        }
                    },
                }
                return mergeVisitorsInPlace(visitor, rule.create(thisContext))
            }, {})
    )
}