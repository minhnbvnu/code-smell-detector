function convertToDOMString (v, treatNullAs) {
    return v === null && treatNullAs ? '' : ToString(v);
}