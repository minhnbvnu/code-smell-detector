function _one(el, left, top) {
                var orphanedPosition = null;
                if (!_isInsideParent(el, [left, top])) {
                    var group = el._jsPlumbGroup;
                    if (prune) {
                        _jsPlumb.remove(el);
                    } else {
                        orphanedPosition = _orphan(el);
                    }

                    group.remove(el);
                }

                return orphanedPosition;
            }