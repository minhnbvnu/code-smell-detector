function has_loop_control(loop, parent, type) {
        if (!type) type = AST_LoopControl;
        var found = false;
        var tw = new TreeWalker(function(node) {
            if (found || node instanceof AST_Scope) return true;
            if (node instanceof type && tw.loopcontrol_target(node) === loop) {
                return found = true;
            }
        });
        if (parent instanceof AST_LabeledStatement) tw.push(parent);
        tw.push(loop);
        loop.body.walk(tw);
        return found;
    }