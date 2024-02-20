function needs_parens_assign_cond(self, output) {
        var p = output.parent();
        // await (a = foo)
        if (p instanceof AST_Await) return true;
        // 1 + (a = 2) + 3 → 6, side effect setting a = 2
        if (p instanceof AST_Binary) return !(p instanceof AST_Assign);
        // (a = func)() —or— new (a = Object)()
        if (p instanceof AST_Call) return p.expression === self;
        // class extends (a = foo) {}
        // class foo extends (bar ? baz : moo) {}
        if (p instanceof AST_Class) return true;
        // (a = foo) ? bar : baz
        if (p instanceof AST_Conditional) return p.condition === self;
        // (a = foo)["prop"] —or— (a = foo).prop
        if (p instanceof AST_PropAccess) return p.expression === self;
        // (a = foo)`bar`
        if (p instanceof AST_Template) return p.tag === self;
        // !(a = false) → true
        if (p instanceof AST_Unary) return true;
    }