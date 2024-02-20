function def_transform(node, descend) {
            node.DEFMETHOD("transform", function (tw, in_list) {
                let transformed = undefined;
                tw.push(this);
                if (tw.before)
                    transformed = tw.before(this, descend, in_list);
                if (transformed === undefined) {
                    transformed = this;
                    descend(transformed, tw);
                    if (tw.after) {
                        const after_ret = tw.after(transformed, in_list);
                        if (after_ret !== undefined)
                            transformed = after_ret;
                    }
                }
                tw.pop();
                return transformed;
            });
        }