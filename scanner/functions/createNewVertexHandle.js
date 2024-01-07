function createNewVertexHandle(index, ringIndex = 0, ringCoordinates) {
            let vertexCoordinates = ringCoordinates || getVertexCoordinates(ringIndex);
            let nextVertex;
            if (index + 1 >= vertexCoordinates.length) {
                nextVertex = vertexCoordinates[0];
            } else {
                nextVertex = vertexCoordinates[index + 1];
            }
            const vertex = vertexCoordinates[index].add(nextVertex).multi(1 / 2);
            const handle = me.createHandle(vertex, {
                'symbol': me.options['newVertexHandleSymbol'],
                'cursor': 'pointer',
                'axis': null,
                onDown: function (param, e) {
                    if (e && e.domEvent && e.domEvent.button === 2) {
                        return;
                    }
                    const prjCoordinates = getVertexPrjCoordinates(ringIndex);
                    const vertexIndex = handle[propertyOfVertexIndex];
                    //add a new vertex
                    const cp = handle.getContainerPoint();
                    const pVertex = map._containerPointToPrj(cp);
                    //update shadow's vertice
                    prjCoordinates.splice(vertexIndex + 1, 0, pVertex);
                    if (ringIndex > 0) {
                        //update hole
                        geoToEdit._prjHoles[ringIndex - 1] = prjCoordinates;
                    } else {
                        geoToEdit._setPrjCoordinates(prjCoordinates);
                    }
                    geoToEdit._updateCache();

                    handle.opacity = 1;

                    //add two "new vertex" handles
                    newVertexHandles[ringIndex].splice(vertexIndex, 0, createNewVertexHandle.call(me, vertexIndex, ringIndex), createNewVertexHandle.call(me, vertexIndex + 1, ringIndex));
                    pauseRefresh = true;
                },
                onMove: function () {
                    moveVertexHandle(handle.getContainerPoint(), handle[propertyOfVertexIndex] + 1, ringIndex);
                },
                onUp: function (e) {
                    if (e && e.domEvent && e.domEvent.button === 2) {
                        pauseRefresh = false;
                        return;
                    }
                    const vertexIndex = handle[propertyOfVertexIndex];
                    //remove this handle
                    removeFromArray(handle, newVertexHandles[ringIndex]);
                    handle.delete();
                    //add a new vertex handle
                    vertexHandles[ringIndex].splice(vertexIndex + 1, 0, createVertexHandle.call(me, vertexIndex + 1, ringIndex));
                    onVertexAddOrRemove();
                    me._updateCoordFromShadow();
                    pauseRefresh = false;
                },
                onRefresh: function (rIndex, ringCoordinates) {
                    vertexCoordinates = ringCoordinates || getVertexCoordinates(rIndex);
                    const vertexIndex = handle[propertyOfVertexIndex];
                    let nextIndex;
                    if (vertexIndex === vertexCoordinates.length - 1) {
                        nextIndex = 0;
                    } else {
                        nextIndex = vertexIndex + 1;
                    }
                    const refreshVertex = vertexCoordinates[vertexIndex].add(vertexCoordinates[nextIndex]).multi(1 / 2);
                    const containerPoint = map.coordToContainerPoint(refreshVertex);
                    handle.setContainerPoint(containerPoint._add(getDxDy()));
                }
            });
            handle[propertyOfVertexIndex] = index;
            return handle;
        }