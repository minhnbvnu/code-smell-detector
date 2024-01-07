function getGraidentExtent(point, w, h) {
    const e = new PointExtent();
    e._combine(point);
    e['xmin'] += -w / 2;
    e['ymin'] += -h / 2;
    e['xmax'] += w / 2;
    e['ymax'] += h / 2;
    return e;
}