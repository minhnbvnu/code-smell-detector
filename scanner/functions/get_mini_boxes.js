function get_mini_boxes(contour) {
        // 生成最小外接矩形
        const bounding_box = CV.minAreaRect(contour);
        const points = [];
        const mat = new CV.Mat();
        // 获取矩形的四个顶点坐标
        CV.boxPoints(bounding_box, mat);
        for (let i = 0; i < mat.data32F.length; i += 2) {
            const arr = [];
            arr[0] = mat.data32F[i];
            arr[1] = mat.data32F[i + 1];
            points.push(arr);
        }

        function sortNumber(a, b) {
            return a[0] - b[0];
        }
        points.sort(sortNumber);
        let index_1 = 0;
        let index_2 = 1;
        let index_3 = 2;
        let index_4 = 3;
        if (points[1][1] > points[0][1]) {
            index_1 = 0;
            index_4 = 1;
        }
        else {
            index_1 = 1;
            index_4 = 0;
        }

        if (points[3][1] > points[2][1]) {
            index_2 = 2;
            index_3 = 3;
        }
        else {
            index_2 = 3;
            index_3 = 2;
        }
        const box = [
            points[index_1],
            points[index_2],
            points[index_3],
            points[index_4]
        ];
        const side = Math.min(bounding_box.size.height, bounding_box.size.width);
        mat.delete();
        return {
            points: box,
            side
        };
    }