function modifierVisitor(node) {
                switch (node.kind) {
                    case 93 /* ExportKeyword */:
                    case 88 /* DefaultKeyword */:
                        return void 0;
                }
                return node;
            }