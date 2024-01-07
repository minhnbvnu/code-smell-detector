function getUpdates() {
            return [
                ['setCoordinates', geometryToEdit.getCoordinates().toArray()],
                ['setWidth', geometryToEdit.getWidth()],
                ['setHeight', geometryToEdit.getHeight()]
            ];
        }