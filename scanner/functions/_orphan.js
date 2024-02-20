function _orphan(_el) {
            var id = _jsPlumb.getId(_el);
            var pos = _jsPlumb.getOffset(_el);
            _el.parentNode.removeChild(_el);
            _jsPlumb.getContainer().appendChild(_el);
            _jsPlumb.setPosition(_el, pos);
            _unbindDragHandlers(_el);
            _jsPlumb.dragManager.clearParent(_el, id);
            return [id, pos];
        }