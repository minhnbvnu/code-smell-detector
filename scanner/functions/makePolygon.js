function makePolygon(object) {
    
            var points = [],
                i;

            if (object.polygon || object.polyline) {
                if (object.polygon) {
                    points = object.polygon;
                } else {
                    points = object.polyline;
                }

                // iterate through each x,y coordinate pair and convert from relative to absolute
                for (i = 0; i < points.length; i += 1) {
                    points[i].x = object.x + points[i].x;
                    points[i].y = object.y + points[i].y;
                }
            } else {
                // object is a rectangle but only top left is defined; build it from width and height
                points = [
                    {'x': object.x, 'y': object.y},
                    {'x': object.x + object.width, 'y': object.y},
                    {'x': object.x + object.width, 'y': object.y + object.height},
                    {'x': object.x, 'y': object.y + object.height}
                ];
            }
    
            return points;
        }