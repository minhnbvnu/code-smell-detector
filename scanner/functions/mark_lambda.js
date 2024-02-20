function mark_lambda(tw, descend, compressor) {
            clear_flag(this, INLINED);
            push(tw);
            reset_variables(tw, compressor, this);
            var iife;
            if (!this.name
                && !this.uses_arguments
                && !this.pinned()
                && (iife = tw.parent()) instanceof AST_Call
                && iife.expression === this
                && !iife.args.some(arg => arg instanceof AST_Expansion)
                && this.argnames.every(arg_name => arg_name instanceof AST_Symbol)) {
                // Virtually turn IIFE parameters into variable definitions:
                //   (function(a,b) {...})(c,d) => (function() {var a=c,b=d; ...})()
                // So existing transformation rules can work on them.
                this.argnames.forEach((arg, i) => {
                    if (!arg.definition)
                        return;
                    var d = arg.definition();
                    // Avoid setting fixed when there's more than one origin for a variable value
                    if (d.orig.length > 1)
                        return;
                    if (d.fixed === undefined && (!this.uses_arguments || tw.has_directive("use strict"))) {
                        d.fixed = function () {
                            return iife.args[i] || make_node(AST_Undefined, iife);
                        };
                        tw.loop_ids.set(d.id, tw.in_loop);
                        mark(tw, d, true);
                    }
                    else {
                        d.fixed = false;
                    }
                });
            }
            descend();
            pop(tw);
            return true;
        }