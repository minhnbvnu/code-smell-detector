function getSegmentAngle(cx, cy, x, y) {
    if (cx === x) {
        if (y > cy) {
            return -90;
        }
        return 90;
    }
    x -= cx;
    y -= cy;
    //经纬坐标系和屏幕坐标正好相反,经纬度向上递增,而屏幕坐标递减
    y = -y;
    const rad = Math.atan2(y, x);
    return rad / Math.PI * 180;
}