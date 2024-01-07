function moveVertexHandle(handleConatainerPoint, index, ringIndex = 0) {
            //for adsorption effect
            const snapTo = me._geometry.snapTo;
            if (snapTo && isFunction(snapTo)) {
                handleConatainerPoint = me._geometry.snapTo(handleConatainerPoint) || handleConatainerPoint;
            }
            const vertice = getVertexPrjCoordinates(ringIndex);
            const nVertex = map._containerPointToPrj(handleConatainerPoint.sub(getDxDy()));
            const pVertex = vertice[index];
            pVertex.x = nVertex.x;
            pVertex.y = nVertex.y;
            geoToEdit._updateCache();
            geoToEdit.onShapeChanged();
            me._updateCoordFromShadow(true);
            let nextIndex;
            if (index === 0) {
                nextIndex = newVertexHandles[ringIndex].length - 1;
            } else {
                nextIndex = index - 1;
            }
            //refresh two neighbor "new vertex" handles.
            if (newVertexHandles[ringIndex][index]) {
                newVertexHandles[ringIndex][index].refresh();
            }
            if (newVertexHandles[ringIndex][nextIndex]) {
                newVertexHandles[ringIndex][nextIndex].refresh();
            }
        }