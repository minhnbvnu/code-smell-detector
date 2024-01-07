function getCubicControlPoints(x0, y0, x1, y1, x2, y2, x3, y3, smoothValue, t) {
            // Assume we need to calculate the control
            // points between (x1,y1) and (x2,y2).
            // Then x0,y0 - the previous vertex,
            //      x3,y3 - the next one.
            const xc1 = (x0 + x1) / 2.0, yc1 = (y0 + y1) / 2.0;
            const xc2 = (x1 + x2) / 2.0, yc2 = (y1 + y2) / 2.0;
            const xc3 = (x2 + x3) / 2.0, yc3 = (y2 + y3) / 2.0;

            const len1 = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
            const len2 = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            const len3 = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));

            const k1 = len1 / (len1 + len2);
            const k2 = len2 / (len2 + len3);

            const xm1 = xc1 + (xc2 - xc1) * k1, ym1 = yc1 + (yc2 - yc1) * k1;

            const xm2 = xc2 + (xc3 - xc2) * k2, ym2 = yc2 + (yc3 - yc2) * k2;

            // Resulting control points. Here smoothValue is mentioned
            // above coefficient K whose value should be in range [0...1].
            const ctrl1X = xm1 + (xc2 - xm1) * smoothValue + x1 - xm1,
                ctrl1Y = ym1 + (yc2 - ym1) * smoothValue + y1 - ym1,

                ctrl2X = xm2 + (xc2 - xm2) * smoothValue + x2 - xm2,
                ctrl2Y = ym2 + (yc2 - ym2) * smoothValue + y2 - ym2;

            const ctrlPoints = [ctrl1X, ctrl1Y, ctrl2X, ctrl2Y];
            if (t < 1) {
                return interpolate(0, t, x1, y1, ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, x2, y2);
            } else {
                return ctrlPoints;
            }
        }