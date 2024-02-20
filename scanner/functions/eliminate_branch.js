function eliminate_branch(branch, prev) {
                if (prev && !aborts(prev)) {
                    prev.body = prev.body.concat(branch.body);
                }
                else {
                    trim_unreachable_code(compressor, branch, decl);
                }
            }