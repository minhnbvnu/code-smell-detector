function box_score_fast(bitmap, _box) {
        const h = height;
        const w = width;
        const box = JSON.parse(JSON.stringify(_box));
        const x = [];
        const y = [];
        box.forEach(item => {
            x.push(item[0]);
            y.push(item[1]);
        });
        // clip这个函数将将数组中的元素限制在a_min, a_max之间，大于a_max的就使得它等于 a_max，小于a_min,的就使得它等于a_min。
        const xmin = clip(Math.floor(Math.min(...x)), 0, w - 1);
        const xmax = clip(Math.ceil(Math.max(...x)), 0, w - 1);
        const ymin = clip(Math.floor(Math.min(...y)), 0, h - 1);
        const ymax = clip(Math.ceil(Math.max(...y)), 0, h - 1);
        // eslint-disable-next-line new-cap
        const mask = new CV.Mat.zeros(ymax - ymin + 1, xmax - xmin + 1, CV.CV_8UC1);
        box.forEach(item => {
            item[0] = Math.max(item[0] - xmin, 0);
            item[1] = Math.max(item[1] - ymin, 0);
        });
        const npts = 4;
        const point_data = new Uint8Array(box.flat());
        const points = CV.matFromArray(npts, 1, CV.CV_32SC2, point_data);
        const pts = new CV.MatVector();
        pts.push_back(points);
        const color = new CV.Scalar(255);
        // 多个多边形填充
        CV.fillPoly(mask, pts, color, 1);
        const sliceArr = [];
        for (let i = ymin; i < ymax + 1; i++) {
            sliceArr.push(...bitmap.slice(960 * i + xmin, 960 * i + xmax + 1));
        }
        const mean = num_mean(sliceArr, mask.data);
        mask.delete();
        points.delete();
        pts.delete();
        return mean;
    }