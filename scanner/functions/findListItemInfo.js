function findListItemInfo(node) {
            const list = findContainingList(node);
            if (!list) {
                return void 0;
            }
            const children = list.getChildren();
            const listItemIndex = indexOfNode(children, node);
            return {
                listItemIndex,
                list
            };
        }