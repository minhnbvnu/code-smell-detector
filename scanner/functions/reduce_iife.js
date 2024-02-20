function reduce_iife(tw, descend, compressor) {
            var fn = this;
            fn.inlined = false;
            var iife = tw.parent();
            var hit = is_async(fn) || is_generator(fn);
            var aborts = false;
            fn.walk(new TreeWalker(function(node) {
                if (hit) return aborts = true;
                if (node instanceof AST_Return) return hit = true;
                if (node instanceof AST_Scope && node !== fn) return true;
            }));
            if (aborts) push(tw);
            reset_variables(tw, compressor, fn);
            // Virtually turn IIFE parameters into variable definitions:
            //   (function(a,b) {...})(c,d) ---> (function() {var a=c,b=d; ...})()
            // So existing transformation rules can work on them.
            var safe = !fn.uses_arguments || tw.has_directive("use strict");
            fn.argnames.forEach(function(argname, i) {
                var value = iife.args[i];
                scan_declaration(tw, compressor, argname, function() {
                    var j = fn.argnames.indexOf(argname);
                    var arg = j < 0 ? value : iife.args[j];
                    if (arg instanceof AST_Sequence && arg.expressions.length < 2) arg = arg.expressions[0];
                    return arg || make_node(AST_Undefined, iife);
                }, visit);
            });
            var rest = fn.rest, fixed_node;
            if (rest) scan_declaration(tw, compressor, rest, compressor.option("rests") && function() {
                if (fn.rest !== rest) return rest;
                if (!fixed_node) fixed_node = make_node(AST_Array, fn);
                fixed_node.elements = iife.args.slice(fn.argnames.length);
                return fixed_node;
            }, visit);
            walk_lambda(fn, tw);
            var safe_ids = tw.safe_ids;
            pop_scope(tw, fn);
            if (!aborts) tw.safe_ids = safe_ids;
            return true;

            function visit(node, fixed) {
                var d = node.definition();
                if (fixed && safe && d.fixed === undefined) {
                    mark(tw, d);
                    tw.loop_ids[d.id] = tw.in_loop;
                    d.fixed = fixed;
                    d.fixed.assigns = [ node ];
                } else {
                    d.fixed = false;
                }
            }
        }