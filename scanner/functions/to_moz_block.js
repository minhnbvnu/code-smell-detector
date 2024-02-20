function to_moz_block(node) {
                return {
                    type: "BlockStatement",
                    body: node.body.map(to_moz)
                };
            }