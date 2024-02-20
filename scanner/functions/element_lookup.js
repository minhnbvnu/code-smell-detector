function element_lookup(root, el_id) {
        let el = root.getElementById(el_id);
        if (el == null) {
            el = document.getElementById(el_id);
        }
        return el;
    }