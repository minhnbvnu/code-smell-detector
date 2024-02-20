function unclip(box) {
        const unclip_ratio = 1.6;
        const area = Math.abs(Polygon.polygonArea(box));
        const length = Polygon.polygonLength(box);
        const distance = area * unclip_ratio / length;
        const tmpArr = [];
        box.forEach(item => {
            const obj = {
                X: 0,
                Y: 0
            };
            obj.X = item[0];
            obj.Y = item[1];
            tmpArr.push(obj);
        });
        const offset = new clipper.ClipperOffset();
        offset.AddPath(tmpArr, clipper.JoinType.jtRound, clipper.EndType.etClosedPolygon);
        const expanded = [];
        offset.Execute(expanded, distance);
        let expandedArr = [];
        expanded[0] && expanded[0].forEach(item => {
            expandedArr.push([item.X, item.Y]);
        });
        expandedArr = [].concat(...expandedArr);
        return expandedArr;
    }