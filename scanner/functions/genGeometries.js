function genGeometries() {
        return [
            //a continuous anti-meridian line-string with a hole
            new maptalks.LineString(
                [[179, 10], [-170, 10], [-169, -10], [179, -10]],
                { arrowStyle: 'classic', arrowPlacement: 'vertex-firstlast' }
            ),
            new maptalks.QuadBezierCurve(
                [[179, 10], [-170, 10], [-169, -10], [179, -10]],
                { arrowStyle: 'classic' }
            ),
            new maptalks.CubicBezierCurve(
                [[179, 10], [-170, 10], [-169, -10], [179, -10]],
                { arrowStyle: 'classic' }
            ),
            //a continuous anti-meridian polygon with a hole
            new maptalks.Polygon([
                [[179, 10], [-170, 10], [-169, -10], [179, -10]],
                [[180, 5], [-175, 5], [-171, -5], [180, -5]]
            ]
            )
        ];
    }