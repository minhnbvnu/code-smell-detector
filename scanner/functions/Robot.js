function Robot(max_retry_times) {
    this.robot = (device.sdkInt < 24) ? new LollipopRobot(max_retry_times) : new GeneralRobot(max_retry_times);

    this.click = function (x, y) {
        return this.robot.click(x, y);
    };

    this.clickCenter = function (b) {
        let rect = b.bounds();
        return this.robot.click(rect.centerX(), rect.centerY());
    };

    this.swipe = function (x1, y1, x2, y2, duration) {
        this.robot.swipe(x1, y1, x2, y2, duration);
    };

    this.back = function () {
        back();
    };

    this.kill = function (package_name) {
        shell("am force-stop " + package_name, true);
    };

    this.close = function () {
        recents();
        sleep(1500);
        let x = device.width >> 1;
        let y2 = device.height >> 2;
        let y1 = device.height - y2;
        gesture(200, [x, y1], [x, y2]);
        sleep(800);
        home();
    };

    this.clickMulti = function (points) {
        points.forEach(function (point) {
            this.robot.click(point[0], point[1]);
        }.bind(this));
    };

    this.clickMultiCenter = function (collection) {
        let points = [];
        collection.forEach(function(o) {
            let rect = o.bounds();
            points.push([rect.centerX(), rect.centerY()]);
        });
        this.clickMulti(points);
    };
    
    this.clickMultiMeantime = function (points) {
        return this.robot.clickMultiMeantime(points);
    };
}