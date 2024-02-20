function visitorNoAsyncModifier(node) {
                if (node.kind === 132 /* AsyncKeyword */) {
                    return void 0;
                }
                return node;
            }