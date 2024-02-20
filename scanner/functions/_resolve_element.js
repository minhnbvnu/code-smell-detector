function _resolve_element(item) {
        const { elementid } = item;
        if (elementid != null)
            return _get_element(elementid);
        else
            return document.body;
    }