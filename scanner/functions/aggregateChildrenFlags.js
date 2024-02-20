function aggregateChildrenFlags(children) {
            let subtreeFlags = 0 /* None */;
            for (const child of children) {
                subtreeFlags |= propagateChildFlags(child);
            }
            children.transformFlags = subtreeFlags;
        }