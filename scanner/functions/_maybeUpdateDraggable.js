function _maybeUpdateDraggable(el) {
            var parent = el.parentNode, container = instance.getContainer();
            while(parent != null && parent !== container) {
                if (instance.hasClass(parent, "jtk-managed")) {
                    instance.recalculateOffsets(parent);
                    return
                }
                parent = parent.parentNode;
            }
        }