function needs_parens_function(output) {
        var p = output.parent();
        if (!output.has_parens() && first_in_statement(output, false, true)) {
            // export default function() {}
            // export default (function foo() {});
            // export default (function() {})(foo);
            // export default (function() {})`foo`;
            // export default (function() {}) ? foo : bar;
            return this.name || !(p instanceof AST_ExportDefault);
        }
        if (output.option("webkit") && p instanceof AST_PropAccess && p.expression === this) return true;
        if (output.option("wrap_iife") && p instanceof AST_Call && p.expression === this) return true;
    }