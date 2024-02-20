function has_break_or_continue(loop, parent) {
            var found = false;
            var tw = new TreeWalker(function (node) {
                if (found || node instanceof AST_Scope)
                    return true;
                if (node instanceof AST_LoopControl && tw.loopcontrol_target(node) === loop) {
                    return found = true;
                }
            });
            if (parent instanceof AST_LabeledStatement)
                tw.push(parent);
            tw.push(loop);
            loop.body.walk(tw);
            return found;
        }