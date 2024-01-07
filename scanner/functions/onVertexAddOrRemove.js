function onVertexAddOrRemove() {
            //restore index property of each handles.
            for (const ringIndex in vertexHandles) {
                for (let i = vertexHandles[ringIndex].length - 1; i >= 0; i--) {
                    vertexHandles[ringIndex][i][propertyOfVertexIndex] = i;
                }
                for (let i = newVertexHandles[ringIndex].length - 1; i >= 0; i--) {
                    newVertexHandles[ringIndex][i][propertyOfVertexIndex] = i;
                }
            }
            me._updateCoordFromShadow();
        }