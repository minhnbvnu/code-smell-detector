function _unbindDragHandlers(_el) {
            if (!_el._katavorioDrag) {
                return;
            }
            if (prune || orphan) {
                _el._katavorioDrag.off(STOP, _pruneOrOrphan);
            }
            if (!prune && !orphan && revert) {
                _el._katavorioDrag.off(REVERT, _revalidate);
                _el._katavorioDrag.setRevert(null);
            }
        }