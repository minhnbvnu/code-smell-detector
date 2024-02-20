function maybeClassFieldAsiHazard(node) {
                if (node.type !== "PropertyDefinition") {
                    return false;
                }
                /*
                 * Computed property names and non-identifiers are always safe
                 * as they can be distinguished from keywords easily.
                 */
                const needsNameCheck = !node.computed && node.key.type === "Identifier";
                /*
                 * Certain names are problematic unless they also have a
                 * a way to distinguish between keywords and property
                 * names.
                 */
                if (needsNameCheck && unsafeClassFieldNames.has(node.key.name)) {
                    /*
                     * Special case: If the field name is `static`,
                     * it is only valid if the field is marked as static,
                     * so "static static" is okay but "static" is not.
                     */
                    const isStaticStatic = node.static && node.key.name === "static";
                    /*
                     * For other unsafe names, we only care if there is no
                     * initializer. No initializer = hazard.
                     */
                    if (!isStaticStatic && !node.value) {
                        return true;
                    }
                }
                const followingToken = sourceCode.getTokenAfter(node);
                return unsafeClassFieldFollowers.has(followingToken.value);
            }