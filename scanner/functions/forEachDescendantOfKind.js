function forEachDescendantOfKind(node, kind, action) {
                        forEachChild(node, (child) => {
                            if (child.kind === kind) {
                                action(child);
                            }
                            forEachDescendantOfKind(child, kind, action);
                        });
                    }