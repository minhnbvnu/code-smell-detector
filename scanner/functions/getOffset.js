function getOffset() {
                var center = map.getCenter();
                var extent = map.getExtent();
                marker.setCoordinates(center);
                return extent.getMax().sub(map.getCenter()).multi(1 / 2);
            }