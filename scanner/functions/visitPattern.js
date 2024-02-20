function visitPattern(node, cb) {
                const visitor = new scope_manager_1.PatternVisitor({}, node, cb);
                visitor.visit(node);
            }