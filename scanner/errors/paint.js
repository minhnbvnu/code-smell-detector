function paint(ticker) {

        // so many vars here because js performance is increased slightly by not accessing
        // object chains
        var pixels,
            moveX = 0, moveY = 0,
            boundaryX, boundaryY,
            absoluteX, absoluteY,
            playerBounds, boundsCheckX, boundsCheckY,
            collideX = false, collideY = false,
            collisionObjects, activeObjects,
            objectCollides = false,
            hitObject, curObject,
            moveTrigger,
            entityX, entityY,
            i, j;

        // safe guard to avoid any excess cycles
        if (gameMode === 'dialog') {
            return;
        }
        if (gameMode === 'exit_dialog') {
            if (Input.keyReleased('action')) {
                gameMode = 'play';
            }

            return;
        }

        // speed of movement
        pixels = 4 * ticker.lastTicksElapsed;
        if (Input.keyboard.enter || Input.keyboard.space) {
            pixels = 2 * ticker.lastTicksElapsed;
        }

        if (Input.keyboard.up) {
            moveY = -pixels;
        }
        if (Input.keyboard.down) {
            moveY = pixels;
        }
        if (Input.keyboard.left) {
            moveX = -pixels;
        }
        if (Input.keyboard.right) {
            moveX = pixels;
        }

        absoluteX = MapSurface.x + Player.x;
        absoluteY = MapSurface.y + Player.y;
            
        // set up bounding box around player object to check for collision and object interaction
        // this runs clockwise from leftX, topY
        playerBounds = [
            {'x': absoluteX + moveX + 10, 'y': absoluteY + moveY + 5}, // left top
            {'x': absoluteX + moveX + (Player.w / 2), 'y': absoluteY + moveY + 5}, // mid top
            {'x': absoluteX + moveX + Player.w - 10, 'y': absoluteY + moveY + 5}, // right top
            {'x': absoluteX + moveX + Player.w - 10, 'y': absoluteY + moveY + (Player.h / 2)}, // right mid
            {'x': absoluteX + moveX + Player.w - 10, 'y': absoluteY + moveY + Player.h - 5}, // right bottom
            {'x': absoluteX + moveX + (Player.w / 2), 'y': absoluteY + moveY + Player.h - 5}, // mid bottom
            {'x': absoluteX + moveX + 10, 'y': absoluteY + moveY + Player.h - 5}, // left bottom
            {'x': absoluteX + moveX + 10, 'y': absoluteY + moveY + (Player.h / 2)}, // left mid
        ];

        if (Input.arrows()) {
            // these will be checked against when player moves to ensure map is not moved if
            // they get close to the boundary of the scene/viewport
            boundaryX = (MapSurface.w / 2) - (Player.w / 2);
            boundaryY = (MapSurface.h / 2) - (Player.h / 2);

            collisionObjects = Map.collisionObjects;

            boundsCheckX = [];
            if (moveX > 0) {
                // right
                boundsCheckX.push(playerBounds[2]); // right top
                boundsCheckX.push(playerBounds[3]); // right mid
                boundsCheckX.push(playerBounds[4]); // right bottom
            } else if (moveX < 0) {
                // left
                boundsCheckX.push(playerBounds[0]); // left top
                boundsCheckX.push(playerBounds[7]); // left mid
                boundsCheckX.push(playerBounds[6]); // left bottom
            }
            boundsCheckY = [];
            if (moveY > 0) {
                // down
                boundsCheckY.push(playerBounds[6]); // left bottom
                boundsCheckY.push(playerBounds[5]); // mid bottom
                boundsCheckY.push(playerBounds[4]); // right bottom
            } else if (moveY < 0) {
                // up
                boundsCheckY.push(playerBounds[0]); // left top
                boundsCheckY.push(playerBounds[1]); // mid top
                boundsCheckY.push(playerBounds[2]); // right top
            }

            // go through all collision surfaces and test against the set of point coordinates for the player position
            if (boundsCheckX.length > 0) {
                i = 0;
                while (!collideX && i < collisionObjects.length) {
                    collideX = SpriteJS.collision.inPolygon(boundsCheckX, collisionObjects[i], true);
    
                    i += 1;
                }
            }
            if (boundsCheckY.length > 0) {
                i = 0;
                while (!collideY && i < collisionObjects.length) {
                    collideY = SpriteJS.collision.inPolygon(boundsCheckY, collisionObjects[i], true);
                    i += 1;
                }
            }

            if (!collideX || !collideY) {
                if (!collideX) {
                    // do not allow the map to go outside bounds of viewport, also not allowing
                    // map to be moved unless player center threshold is crossed
                    if ((moveX > 0 && (MapSurface.w + MapSurface.x) < mapDimensions.w && Player.x >= boundaryX)
                            || (moveX < 0 && MapSurface.x >= Math.abs(moveX) && Player.x <= boundaryX)) {
                        MapSurface.move(moveX, 0);
                    } else {
                        Player.move(moveX, 0);

                        if (Player.x < 0) {
                            Player.setX(0);
                        }
                        if (Player.x > MapSurface.w - Player.w) {
                            Player.setX(MapSurface.w - Player.w);
                        }
                    }
                }
                if (!collideY) {
                    // do not allow the map to go outside bounds of viewport, also not allowing
                    // map to be moved unless player center threshold is crossed
                    if ((moveY > 0 && (MapSurface.h + MapSurface.y) < mapDimensions.h && Player.y >= boundaryY)
                            || (moveY < 0 && MapSurface.y >= Math.abs(moveY) && Player.y <= boundaryY)) {
                        MapSurface.move(0, moveY);
                    } else {
                        Player.move(0, moveY);

                        if (Player.y < 0) {
                            Player.setY(0);
                        }
                        if (Player.y > MapSurface.h - Player.h) {
                            Player.setY(MapSurface.h - Player.h);
                        }
                    }
                }
            } // end if collides
        } // end if Input.arrows()

        activeObjects = Map.activeObjects;

        // go through all object surfaces and test for player position (for actions such as teleport, dialog, fight etc.)
        i = 0;
        while (!objectCollides && i < activeObjects.length) {
            // don't attempt to calculate collision unless the object is a polygon that can be run into
            if (activeObjects[i].hasOwnProperty('polygon')) {
                objectCollides = SpriteJS.collision.inPolygon(playerBounds, activeObjects[i].polygon);
                if (objectCollides) {
                    hitObject = activeObjects[i];
                }
            }
            i += 1;
        }

        if (hitObject !== undefined) {
            if (hitObject.type === 'teleport_to') {
                // case when player goes in our out of the current map
                ticker.pause();
                // pass the position ID to teleport to as well as the callback when finished with setup
                Map = new TileMap(MAPS_DIR + hitObject.map, Scene, hitObject.to_id, Scene.main);

                return;
            }
            if (hitObject.type === 'dialog' && Input.keyReleased('action')) {
                // case where player interacts with an object that creates dialog
                ticker.pause();
                startDialog(hitObject.dialog);

                return;
            }
            if (hitObject.type === 'entity' && Input.keyboard.action) {
                // case where player kills a pig :P
                SoundJS.play('pig');
                // remove hit pig from available objects
                Map.removeObject(i);
            }
        }

        // player animation for movement, attack etc.
        getAnimation(moveX, moveY);
    
        // determine automatic movement for some object entities (such as pigs)
        moveTrigger = (Scene.ticker.currentTick % 300);

        // deal with active objects (dialogs, entities, etc.)
        for (i = 0; i < activeObjects.length; i += 1) {
            curObject = activeObjects[i];

            // display
            if (curObject.type === 'dialog') {
                entityX = curObject.x - MapSurface.x + (curObject.w / 2) - (curObject.sprite.w / 2);
                entityY = curObject.y - MapSurface.y - curObject.sprite.h + (5 * Math.cos(Scene.ticker.currentTick / 8.0));

                curObject.sprite.position(entityX, entityY);
                curObject.sprite.canvasUpdate(MapSurface.front);
            } else if (curObject.type === 'entity') {
                if (SpriteJS.Map.collides(curObject.x + 24, curObject.y + 24)) {
                    curObject.xv = -curObject.xv;
                    curObject.yv = -curObject.yv;
                }

                if (moveTrigger < 10) {
                    curObject.xv = 1.5 * (Math.random() - 0.5);
                    curObject.yv = 1.5 * (Math.random() - 0.5);
                } else if (moveTrigger > 200) {
                    curObject.x = curObject.x + curObject.xv;
                    curObject.y = curObject.y + curObject.yv;
                }

                // bitwise (integer) comparison
                entityX = (curObject.x - MapSurface.x) | 0;
                entityY = (curObject.y - MapSurface.y) | 0;

                curObject.sprite.position(entityX, entityY);
                curObject.sprite.canvasUpdate(MapSurface.front);
            }
        } // end for

        Player.update();
        MapSurface.update();

        if (debug.output && Scene.ticker.currentTick % 20 === 0) {
            debug.fps.innerHTML = ticker.fps;
            debug.load.innerHTML = ticker.load;
            debug.dropped.innerHTML = ticker.droppedFrames;
        }
    }