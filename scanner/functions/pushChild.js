function pushChild(parent2, child) {
            if (parent2.children) {
                parent2.children.push(child);
            }
            else {
                parent2.children = [child];
            }
        }