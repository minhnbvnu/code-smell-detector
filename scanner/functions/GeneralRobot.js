function GeneralRobot(max_retry_times) {
    this.max_retry_times = max_retry_times || 10;

    this.click = function (x, y) {
        return click(x, y);
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        duration = duration || 50;
        return swipe(x1, y1, x2, y2, duration);
    };

    this.clickMultiMeantime = function (points) {
        let list = [];
        let duration = 1;
        let max_point = 10; // 最多触摸点数
        points.forEach(function (point) {
            list.push([0, duration, point]);
        });

        // 同时点击多个点
        let chunks = list.chunk(max_point); // 太多点则分成多段
        chunks.forEach(function (chunk) {
            gestures.apply(null, chunk);
        });
    };
}