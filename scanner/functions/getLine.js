function getLine() {
            const offset = 0.001;
            function randomOffset() {
                return offset / 2 + offset * Math.random()
            }
            const c1 = center.add(-randomOffset(), 0), c2 = center.add(randomOffset(), 0);
            const p1 = map.coordinateToContainerPoint(c1), p2 = map.coordinateToContainerPoint(c2);
            const pixel = {
                x: p1.x / 2 + p2.x / 2,
                y: p1.y / 2 + p2.y / 2
            };

            const size = map.getSize();
            const cx = size.width / 2, cy = size.height / 2;
            const x = pixel.x - cx, y = pixel.y - cy;
            p = { x: Math.round(x), y: Math.round(y) };

            c1.z = 50 + Math.random() * 10;
            c2.z = 50 + Math.random() * 10;
            const line = new maptalks.LineString([c1, c2], {
                symbol: symbol,
                properties: {
                    altitude: [c1.z, c2.z]
                }
            })
            return line;
        }