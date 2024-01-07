function getVertexPrjCoordinates(ringIndex = 0) {
            if (ringIndex === 0) {
                return geoToEdit._getPrjCoordinates();
            }
            return geoToEdit._getPrjHoles()[ringIndex - 1];
        }