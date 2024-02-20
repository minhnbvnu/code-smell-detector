function setEachParent(children, parent2) {
            if (children) {
                for (const child of children) {
                    setParent(child, parent2);
                }
            }
            return children;
        }