function MAP(a, tw, allow_splicing = true) {
                const new_a = [];
                for (let i = 0; i < a.length; ++i) {
                    let item = a[i];
                    let ret = item.transform(tw, allow_splicing);
                    if (ret instanceof AST_Node) {
                        new_a.push(ret);
                    }
                    else if (ret instanceof Splice) {
                        new_a.push(...ret.v);
                    }
                }
                return new_a;
            }