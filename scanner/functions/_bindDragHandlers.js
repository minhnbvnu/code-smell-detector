function _bindDragHandlers(_el) {
            if (!_el._katavorioDrag) {
                return;
            }
            if (prune || orphan) {
                _el._katavorioDrag.on(STOP, _pruneOrOrphan);
            }

            if (constrain) {
                _el._katavorioDrag.setConstrain(true);
            }

            if (ghost) {
                _el._katavorioDrag.setUseGhostProxy(true);
            }

            if (!prune && !orphan && revert) {
                _el._katavorioDrag.on(REVERT, _revalidate);
                _el._katavorioDrag.setRevert(function(__el, pos) {
                    return !_isInsideParent(__el, pos);
                });
            }
        }