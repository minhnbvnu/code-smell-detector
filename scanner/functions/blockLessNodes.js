function blockLessNodes(node) {
                if (node.body.type !== "BlockStatement") {
                    blockIndentationCheck(node);
                }
            }