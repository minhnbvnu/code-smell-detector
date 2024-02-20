function isBeforeBlockContext(context) {
            return nodeIsBlockContext(context.nextTokenParent);
        }