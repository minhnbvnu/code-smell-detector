function getVertexCoordinates(ringIndex = 0) {
            if (geoToEdit instanceof Polygon) {
                const coordinates = geoToEdit.getCoordinates()[ringIndex] || [];
                return coordinates.slice(0, coordinates.length - 1);
            } else {
                return geoToEdit.getCoordinates();
            }
        }