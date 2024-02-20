function diffPoints(point1, point2) {
    return {
        left: point1.left - point2.left,
        top: point1.top - point2.top
    };
}