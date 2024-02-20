function parseDragMeta(raw) {
        var leftoverProps = {};
        var refined = refineProps(raw, DRAG_META_PROPS, DRAG_META_DEFAULTS, leftoverProps);
        refined.leftoverProps = leftoverProps;
        return refined;
    }