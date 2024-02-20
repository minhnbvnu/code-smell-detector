function buildMapObjects(layer) {

            var object, shape,
                teleportIDs = [],
                i;

            for (i = 0; i < layer.objects.length; i += 1) {
                object = layer.objects[i];

                if (layer.hasOwnProperty('properties') && layer.properties.type === 'collision') {
                    shape = makePolygon(object);
                    that.collisionObjects.push(shape);
                } else {
                    switch (object.type) {
                    case 'player_start':
                        that.playerStart.x = object.x;
                        that.playerStart.y = object.y;
                        break;
                    case 'teleport_to':
                        shape = {
                            'type': 'teleport_to',
                            'map': object.properties.map,
                            'to_id': object.properties.id,
                            'polygon': makePolygon(object)
                        };
                        that.activeObjects.push(shape);
                        break;
                    case 'teleport_from':
                        teleportIDs[object.properties.id] = {
                            'x': object.x,
                            'y': object.y
                        };
                        break;
                    case 'dialog':
                        shape = {
                            'type': 'dialog',
                            'dialog': object.properties,
                            'polygon': makePolygon(object)
                        };
                        shape.sprite = that.Scene.Sprite('assets/images/arrow.png', {
                            'w': 24,
                            'h': 28,
                            'x': object.x,
                            'y': (object.y - 28)
                        });
                        that.activeObjects.push(shape);
                        break;
                    case 'entity':
                        // right now this is just a pig but needs to be converted to anything
                        shape = {
                            'type': 'entity',
                            'gid': object.gid,
                            'properties': object.properties,
                            'polygon': makePolygon(object),
                            'sprite': getSprite(object.gid)
                        };
                        that.activeObjects.push(shape);
                        break;
                    } // end switch
                } // end if/else
            } // end for

            // when a start position is passed in, use it instead of built-in player start
            // this is typically if not always from a teleport scenario
            if (that.startPositionID !== undefined && teleportIDs[that.startPositionID] !== undefined) {
                that.playerStart = teleportIDs[that.startPositionID];
            }
            if (that.playerStart.length === 0) {
                that.playerStart = {
                    'x': 0,
                    'y': 0
                };
            }
        }