function removeVertex(param) {
            me._updating = true;
            const handle = param['target'],
                index = handle[propertyOfVertexIndex];
            const ringIndex = isNumber(handle._ringIndex) ? handle._ringIndex : 0;
            const prjCoordinates = getVertexPrjCoordinates(ringIndex);
            if (prjCoordinates.length <= verticeLimit) {
                return;
            }
            const isEnd = (geoToEdit instanceof LineString) && (index === 0 || index === prjCoordinates.length - 1);
            prjCoordinates.splice(index, 1);
            if (ringIndex > 0) {
                //update hole prj
                geoToEdit._prjHoles[ringIndex - 1] = prjCoordinates;
            } else {
                //update shell prj
                geoToEdit._setPrjCoordinates(prjCoordinates);
            }
            geoToEdit._updateCache();
            //remove vertex handle
            vertexHandles[ringIndex].splice(index, 1)[0].delete();
            //remove two neighbor "new vertex" handles
            if (index < newVertexHandles[ringIndex].length) {
                newVertexHandles[ringIndex].splice(index, 1)[0].delete();
            }
            let nextIndex;
            if (index === 0) {
                nextIndex = newVertexHandles[ringIndex].length - 1;
            } else {
                nextIndex = index - 1;
            }
            newVertexHandles[ringIndex].splice(nextIndex, 1)[0].delete();
            if (!isEnd) {
                //add a new "new vertex" handle.
                newVertexHandles[ringIndex].splice(nextIndex, 0, createNewVertexHandle.call(me, nextIndex, ringIndex));
            }
            if (ringIndex > 0) {
                const coordiantes = geoToEdit.getCoordinates();
                //fix hole Vertex delete
                const ring = coordiantes[ringIndex];
                if (ring && Array.isArray(ring) && ring.length > 1) {
                    ring.splice(index, 1);
                    //update shadow coordinates
                    if (geoToEdit !== this._geometry) {
                        geoToEdit.setCoordinates(coordiantes);
                    }
                }
            }
            onVertexAddOrRemove();
            me._updating = false;
        }