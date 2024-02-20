function has_nested_break(root) {
                let has_break = false;
                let tw = new TreeWalker(node => {
                    if (has_break)
                        return true;
                    if (node instanceof AST_Lambda)
                        return true;
                    if (node instanceof AST_SimpleStatement)
                        return true;
                    if (!is_break(node, tw))
                        return;
                    let parent = tw.parent();
                    if (parent instanceof AST_SwitchBranch
                        && parent.body[parent.body.length - 1] === node) {
                        return;
                    }
                    has_break = true;
                });
                root.walk(tw);
                return has_break;
            }