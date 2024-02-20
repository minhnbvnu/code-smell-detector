function bounding_box(el) {
        const { x, y, width, height } = el.getBoundingClientRect();
        return new bbox_1.BBox({ x, y, width, height });
    }