function bindParentToChild(child, parent2) {
                return bindParentToChildIgnoringJSDoc(child, parent2) || bindJSDoc(child);
            }