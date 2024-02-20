function beforeEmitNode(node) {
                if (preserveSourceNewlines && getInternalEmitFlags(node) & 4 /* IgnoreSourceNewlines */) {
                    preserveSourceNewlines = false;
                }
            }