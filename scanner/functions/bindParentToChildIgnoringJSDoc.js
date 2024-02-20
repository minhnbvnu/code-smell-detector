function bindParentToChildIgnoringJSDoc(child, parent2) {
                if (incremental && child.parent === parent2) {
                    return "skip";
                }
                setParent(child, parent2);
            }