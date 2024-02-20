function findInvalidAncestor(node) {
                const parent = util.nullThrows(node.parent, util.NullThrowsReasons.MissingParent);
                if (parent.type === utils_1.AST_NODE_TYPES.SequenceExpression) {
                    if (node !== parent.expressions[parent.expressions.length - 1]) {
                        return null;
                    }
                }
                if (parent.type === utils_1.AST_NODE_TYPES.ExpressionStatement) {
                    // e.g. `{ console.log("foo"); }`
                    // this is always valid
                    return null;
                }
                if (parent.type === utils_1.AST_NODE_TYPES.LogicalExpression) {
                    if (parent.right === node) {
                        // e.g. `x && console.log(x)`
                        // this is valid only if the next ancestor is valid
                        return findInvalidAncestor(parent);
                    }
                }
                if (parent.type === utils_1.AST_NODE_TYPES.ConditionalExpression) {
                    if (parent.consequent === node || parent.alternate === node) {
                        // e.g. `cond ? console.log(true) : console.log(false)`
                        // this is valid only if the next ancestor is valid
                        return findInvalidAncestor(parent);
                    }
                }
                if (parent.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression) {
                    // e.g. `() => console.log("foo")`
                    // this is valid with an appropriate option
                    if (options.ignoreArrowShorthand) {
                        return null;
                    }
                }
                if (parent.type === utils_1.AST_NODE_TYPES.UnaryExpression) {
                    if (parent.operator === 'void') {
                        // e.g. `void console.log("foo")`
                        // this is valid with an appropriate option
                        if (options.ignoreVoidOperator) {
                            return null;
                        }
                    }
                }
                if (parent.type === utils_1.AST_NODE_TYPES.ChainExpression) {
                    // e.g. `console?.log('foo')`
                    return findInvalidAncestor(parent);
                }
                // any other parent is invalid
                return parent;
            }