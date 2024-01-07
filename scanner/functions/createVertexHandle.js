function createVertexHandle(index, ringIndex = 0, ringCoordinates) {
            //not get geometry coordiantes when ringCoordinates is not null
            //每个vertex都去获取geometry的coordinates太耗时了，应该所有vertex都复用传进来的ringCoordinates
            let vertex = (ringCoordinates || getVertexCoordinates(ringIndex))[index];
            const handle = me.createHandle(map.coordToContainerPoint(vertex)._add(getDxDy()), {
                'symbol': me.options['vertexHandleSymbol'],
                'cursor': 'pointer',
                'axis': null,
                onMove: function () {
                    moveVertexHandle(handle.getContainerPoint(), handle[propertyOfVertexIndex], ringIndex);
                },
                onRefresh: function (rIndex, ringCoordinates) {
                    vertex = (ringCoordinates || getVertexCoordinates(ringIndex))[handle[propertyOfVertexIndex]];
                    const containerPoint = map.coordToContainerPoint(vertex);
                    handle.setContainerPoint(containerPoint._add(getDxDy()));
                },
                onUp: function () {
                    me._updateCoordFromShadow();
                },
                onDown: function (param, e) {
                    if (e && e.domEvent && e.domEvent.button === 2) {
                        return;
                    }
                }
            });
            handle[propertyOfVertexIndex] = index;
            handle._ringIndex = ringIndex;
            handle.on(me.options['removeVertexOn'], removeVertex);
            return handle;
        }