function pointsContainerPoints(viewPoints = [], alts = []) {
            let pts = getPointsResultPts(viewPoints, ptkey);
            pts = map._pointsAtResToContainerPoints(viewPoints, glRes, alts, pts);
            for (let i = 0, len = pts.length; i < len; i++) {
                const p = pts[i];
                p._sub(containerOffset);
                if (dx || dy) {
                    p._add(dx || 0, dy || 0);
                }
                if (roundPoint) {
                    //使用 round 会导致左右波动，用floor,ceil 要好点
                    p.x = Math.ceil(p.x);
                    p.y = Math.ceil(p.y);
                }
                minx = Math.min(p.x, minx);
                miny = Math.min(p.y, miny);
                maxx = Math.max(p.x, maxx);
                maxy = Math.max(p.y, maxy);
            }
            if (needClip && isDashLine(symbolizers)) {
                TEMP_CLIP_EXTENT2.ymin = containerExtent.ymin;
                if (TEMP_CLIP_EXTENT2.ymin < clipBBoxBufferSize) {
                    TEMP_CLIP_EXTENT2.ymin = containerExtent.ymin - clipBBoxBufferSize;
                }
                TEMP_CLIP_EXTENT2.xmin = containerExtent.xmin - clipBBoxBufferSize;
                TEMP_CLIP_EXTENT2.xmax = containerExtent.xmax + clipBBoxBufferSize;
                TEMP_CLIP_EXTENT2.ymax = containerExtent.ymax + clipBBoxBufferSize;
                if (geometry.getShell && geometry.getHoles) {
                    return clipPolygon(pts, TEMP_CLIP_EXTENT2);
                }
                const clipPts = clipLine(pts, TEMP_CLIP_EXTENT2, false);
                if (clipPts.length) {
                    const points = [];
                    clipPts.forEach(clipPt => {
                        for (let i = 0, len = clipPt.length; i < len; i++) {
                            points.push(clipPt[i].point);
                        }
                    });
                    return points;
                }
            }
            return pts;
        }