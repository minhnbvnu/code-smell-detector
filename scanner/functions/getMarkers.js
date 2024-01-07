function getMarkers() {
        red = new maptalks.Marker(map.getCenter(), {
            symbol : {
                'markerType' : 'ellipse',
                'markerWidth' : 10,
                'markerHeight' : 10,
                'markerFill' : '#f00'
            }
        });
        green = new maptalks.Marker(map.getCenter(), {
            symbol : {
                'markerType' : 'ellipse',
                'markerWidth' : 10,
                'markerHeight' : 10,
                'markerFill' : '#0f0'
            }
        });
        blue = new maptalks.Marker(map.getCenter(), {
            symbol : {
                'markerType' : 'ellipse',
                'markerWidth' : 10,
                'markerHeight' : 10,
                'markerFill' : '#00f'
            }
        });
        return [red, green, blue];
    }