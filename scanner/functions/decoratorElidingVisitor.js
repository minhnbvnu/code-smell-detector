function decoratorElidingVisitor(node) {
                return isDecorator(node) ? void 0 : visitor(node);
            }