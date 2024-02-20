function isModifyingProp(reference) {
                let node = reference.identifier;
                let parent = node.parent;
                while (parent && (!stopNodePattern.test(parent.type) ||
                    parent.type === "ForInStatement" || parent.type === "ForOfStatement")) {
                    switch (parent.type) {
                        // e.g. foo.a = 0;
                        case "AssignmentExpression":
                            return parent.left === node;
                        // e.g. ++foo.a;
                        case "UpdateExpression":
                            return true;
                        // e.g. delete foo.a;
                        case "UnaryExpression":
                            if (parent.operator === "delete") {
                                return true;
                            }
                            break;
                        // e.g. for (foo.a in b) {}
                        case "ForInStatement":
                        case "ForOfStatement":
                            if (parent.left === node) {
                                return true;
                            }
                            // this is a stop node for parent.right and parent.body
                            return false;
                        // EXCLUDES: e.g. cache.get(foo.a).b = 0;
                        case "CallExpression":
                            if (parent.callee !== node) {
                                return false;
                            }
                            break;
                        // EXCLUDES: e.g. cache[foo.a] = 0;
                        case "MemberExpression":
                            if (parent.property === node) {
                                return false;
                            }
                            break;
                        // EXCLUDES: e.g. ({ [foo]: a }) = bar;
                        case "Property":
                            if (parent.key === node) {
                                return false;
                            }
                            break;
                        // EXCLUDES: e.g. (foo ? a : b).c = bar;
                        case "ConditionalExpression":
                            if (parent.test === node) {
                                return false;
                            }
                            break;
                        // no default
                    }
                    node = parent;
                    parent = node.parent;
                }
                return false;
            }