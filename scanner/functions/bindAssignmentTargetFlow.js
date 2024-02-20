function bindAssignmentTargetFlow(node) {
                if (isNarrowableReference(node)) {
                    currentFlow = createFlowMutation(16 /* Assignment */, currentFlow, node);
                }
                else if (node.kind === 206 /* ArrayLiteralExpression */) {
                    for (const e of node.elements) {
                        if (e.kind === 227 /* SpreadElement */) {
                            bindAssignmentTargetFlow(e.expression);
                        }
                        else {
                            bindDestructuringTargetFlow(e);
                        }
                    }
                }
                else if (node.kind === 207 /* ObjectLiteralExpression */) {
                    for (const p of node.properties) {
                        if (p.kind === 299 /* PropertyAssignment */) {
                            bindDestructuringTargetFlow(p.initializer);
                        }
                        else if (p.kind === 300 /* ShorthandPropertyAssignment */) {
                            bindAssignmentTargetFlow(p.name);
                        }
                        else if (p.kind === 301 /* SpreadAssignment */) {
                            bindAssignmentTargetFlow(p.expression);
                        }
                    }
                }
            }