function _pruneOrOrphan(p) {

            var out = [];

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

            for (var i = 0; i < p.selection.length; i++) {
                out.push(_one(p.selection[i][0], p.selection[i][1].left, p.selection[i][1].top));
            }

            return out.length === 1 ? out[0] : out;

        }