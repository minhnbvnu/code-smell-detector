function _revalidate(_el) {
            var id = _jsPlumb.getId(_el);
            _jsPlumb.revalidate(_el);
            _jsPlumb.dragManager.revalidateParent(_el, id);
        }