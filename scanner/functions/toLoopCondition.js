function toLoopCondition(reference) {
                if (reference.init) {
                    return null;
                }
                let group = null;
                let child = reference.identifier;
                let node = child.parent;
                while (node) {
                    if (SENTINEL_PATTERN.test(node.type)) {
                        if (LOOP_PATTERN.test(node.type) && node.test === child) {
                            // This reference is inside of a loop condition.
                            return {
                                reference,
                                group,
                                isInLoop: isInLoop[node.type].bind(null, node),
                                modified: false
                            };
                        }
                        // This reference is outside of a loop condition.
                        break;
                    }
                    /*
                     * If it's inside of a group, OK if either operand is modified.
                     * So stores the group this reference belongs to.
                     */
                    if (GROUP_PATTERN.test(node.type)) {
                        // If this expression is dynamic, no need to check.
                        if (hasDynamicExpressions(node)) {
                            break;
                        }
                        else {
                            group = node;
                        }
                    }
                    child = node;
                    node = node.parent;
                }
                return null;
            }