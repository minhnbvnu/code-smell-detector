function offset_bbox(element) {
        const { top, left, width, height } = element.getBoundingClientRect();
        return new bbox_1.BBox({
            left: left + scrollX - document.documentElement.clientLeft,
            top: top + scrollY - document.documentElement.clientTop,
            width,
            height,
        });
    }