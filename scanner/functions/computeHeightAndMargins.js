function computeHeightAndMargins(el) {
        return el.getBoundingClientRect().height + computeVMargins(el);
    }