function needs_parens_unary(output) {
        var p = output.parent();
        // (-x) ** y
        if (p instanceof AST_Binary) return p.operator == "**" && p.left === this;
        // (await x)(y)
        // new (await x)
        if (p instanceof AST_Call) return p.expression === this;
        // class extends (x++) {}
        // class x extends (typeof y) {}
        if (p instanceof AST_Class) return true;
        // (x++)[y]
        // (typeof x).y
        if (p instanceof AST_PropAccess) return p.expression === this;
        // (~x)`foo`
        if (p instanceof AST_Template) return p.tag === this;
    }