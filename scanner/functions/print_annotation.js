function print_annotation(self, output) {
        if (!output.option("annotations")) return;
        if (!self.pure) return;
        var level = 0, parent = self, node;
        do {
            node = parent;
            parent = output.parent(level++);
            if (parent instanceof AST_Call && parent.expression === node) return;
        } while (parent instanceof AST_PropAccess && parent.expression === node);
        output.print(typeof self.pure == "string" ? "/*" + self.pure + "*/" : "/*@__PURE__*/");
    }