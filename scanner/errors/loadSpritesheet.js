    function spritesheetLoadCallback(dataPair, ignore_image, url) {
        onLoadFileComplete(pngURL);
        const data = dataPair[0];

        // Compute the transposedSpritesheet uint16 data
        transposedSpritesheet.$uint16Data = new Uint16Array(data.length);
        transposedSpritesheet.$uint16Data.width = data.height;
        transposedSpritesheet.$uint16Data.height = data.width;
        
        transposedSpritesheet.$uint16DataFlippedX = new Uint16Array(data.length);
        transposedSpritesheet.$uint16DataFlippedX.width = data.height;
        transposedSpritesheet.$uint16DataFlippedX.height = data.width;
        
        for (let y = 0; y < data.width; ++y) {
            for (let x = 0; x < data.height; ++x) {
                const i = x + y * data.height;
                const j = (data.height - 1 - x) + y * data.height;
                const k = x * data.width + y;
                transposedSpritesheet.$uint16Data[i] =
                    transposedSpritesheet.$uint16DataFlippedX[j] =
                    data[k];
            }
        }

        spritesheet.$uint16Data = data;
        spritesheet.$uint16DataFlippedX = dataPair[1];
        
        // Store the region for the editor
        spritesheet.$sourceRegion = region;
        
        const boundingRadius = Math.hypot(spritesheet.sprite_size.x, spritesheet.sprite_size.y);
        spritesheet.size = {x: data.width, y: data.height};
        transposedSpritesheet.size = {x: spritesheet.size.y, y: spritesheet.size.x};

        // Pivots (compute after sprite size is known)
        const sspivot = json.pivot ? Object.freeze({x: json.pivot.x - spritesheet.sprite_size.x / 2, y: json.pivot.y - spritesheet.sprite_size.y / 2}) : Object.freeze({x: 0, y: 0});
        const transposedPivot = Object.freeze({x: sspivot.y, y: sspivot.x});
        
        const sheetDefaultframes = Math.max(json.default_frames || 1, 0.25);
        
        // Create the default grid mapping (may be swapped on the following line)
        let rows = Math.floor((data.height + spritesheet.$gutter) / (spritesheet.sprite_size.y + spritesheet.$gutter));
        let cols = Math.floor((data.width  + spritesheet.$gutter) / (spritesheet.sprite_size.x + spritesheet.$gutter));

        if (json.transpose) { let temp = rows; rows = cols; cols = temp; }

        if (rows === 0 || cols === 0) {
            throw new Error('Spritesheet ' + jsonURL + ' has a sprite_size that is larger than the entire spritesheet.');
        }

        transposedSpritesheet.length = rows;
        for (let y = 0; y < rows; ++y) {
            transposedSpritesheet[y] = new Array(cols);
        }
        
        for (let x = 0; x < cols; ++x) {
            spritesheet[x] = [];
            
            for (let y = 0; y < rows; ++y) {
                const u = json.transpose ? y : x, v = json.transpose ? x : y;
                
                // Check each sprite for alpha channel
                let hasAlpha = false;
                let hasFractionalAlpha = false;
                const mean_color = {r: 0, g: 0, b: 0, a: 0};
                outerloop:
                for (let j = 0; j < spritesheet.sprite_size.y; ++j) {
                    let index = (v * (spritesheet.sprite_size.y + spritesheet.$gutter) + j) * data.width + u * (spritesheet.sprite_size.x + spritesheet.$gutter);
                    for (let i = 0; i < spritesheet.sprite_size.x; ++i, ++index) {
                        const alpha15 = (data[index] >>> 12) & 0xf;

                        const alpha = alpha15 / 15;
                        mean_color.r += alpha * (data[index] >>> 8) & 0xf;
                        mean_color.g += alpha * (data[index] >>> 4) & 0xf;
                        mean_color.b += alpha * data[index] & 0xf;
                        mean_color.a += alpha;
                        
                        if (alpha15 < 0xf) {
                            hasAlpha = true;

                            if (alpha15 > 0) {
                                hasFractionalAlpha = true;
                                // Can't break out when computing
                                // the mean color
                                //break outerloop;
                            }
                        }
                    }
                }

                if (mean_color.a > 0) {
                    mean_color.r /= 15 * mean_color.a;
                    mean_color.g /= 15 * mean_color.a;
                    mean_color.b /= 15 * mean_color.a;
                    mean_color.a /= spritesheet.sprite_size.x * spritesheet.sprite_size.y;
                }
                mean_color.$color = QRuntime.$colorToUint16(mean_color);
                Object.freeze(mean_color);
                
                let centerColor;
                {
                    const x = u * (spritesheet.sprite_size.x + spritesheet.$gutter) + Math.floor(spritesheet.sprite_size.x / 2);
                    const y = v * (spritesheet.sprite_size.y + spritesheet.$gutter) + Math.floor(spritesheet.sprite_size.y / 2);
                    centerColor = data[x + y * data.width];
                }

                // Create the actual sprite
                const sprite = {
                    $type:             'sprite',
                    $color:            centerColor,
                    $name:             spritesheet.$name + '[' + u + '][' + v + ']',
                    $tileX:            u,
                    $tileY:            v,
                    $boundingRadius:   boundingRadius,
                    $x:                u * (spritesheet.sprite_size.x + spritesheet.$gutter),
                    $y:                v * (spritesheet.sprite_size.y + spritesheet.$gutter),
                    $hasAlpha:         hasAlpha,
                    $requiresBlending: hasFractionalAlpha,
                    // Actual spritesheet for rendering
                    $spritesheet:      spritesheet,
                    // Source spritesheet for game logic
                    spritesheet:       spritesheet,
                    tile_index:        Object.freeze({x:u, y:v}),
                    id:                lastSpriteID,
                    orientation_id:    lastSpriteID,
                    size:              spritesheet.sprite_size,
                    scale:             PP,
                    pivot:             sspivot,
                    frames:            sheetDefaultframes,
                    mean_color:        mean_color
                };
                sprite.base = sprite;

                spritesheet[x][y] = sprite;

                const transposedSprite = {
                    $type:             'sprite',
                    $color:            centerColor,
                    $name:             sprite.$name + '.rotated_270.x_flipped',
                    $boundingRadius:   boundingRadius,

                    // Sprite index
                    $tileX:            sprite.$tileY,
                    $tileY:            sprite.$tileX,

                    // Pixel coord in tile
                    $x:                sprite.$y,
                    $y:                sprite.$x,

                    $hasAlpha:         sprite.$hasAlpha,
                    $requiresBlending: sprite.$requiresBlending,
                    $spritesheet:      transposedSpritesheet,
                    spritesheet:       spritesheet,
                    tile_index:        sprite.tile_index,
                    id:                lastSpriteID,
                    orientation_id:    lastSpriteID + 3,
                    size:              transposedSpritesheet.sprite_size,
                    scale:             PP,
                    pivot:             transposedPivot,
                    frames:            sheetDefaultframes,
                    base:              sprite,
                    mean_color:        sprite.mean_color
                };

                transposedSpritesheet[y][x] = transposedSprite;
                
                lastSpriteID += 6;
            }
            
            Object.freeze(spritesheet[x]);
        }

        // Process the name table
        if (json.names) {
            if (Array.isArray(json.names) || (typeof json.names !== 'object')) {
                throw new Error('The "names" entry in a sprite.json file must be an object (was "' + (typeof json.names) + '")');
            }

            // Excluded from the default property list
            const builtInProperties = ['', 'id', 'frames', 'x', 'y', 'x_flipped', 'y_flipped', 'rotated_90', 'rotated_180', 'rotated_270', 'scale', 'size', 'pivot', 'spritesheet', 'tile_index', 'start', 'end'];
            
            for (let anim in json.names) {
                const data = json.names[anim];
                
                // Error checking
                if ((data.start !== undefined && data.x !== undefined) || (data.start === undefined && data.x === undefined)) {
                    throw new Error('Animation data for "' + anim + '" must have either "x" and "y" fields or a "start" field, but not both');
                }
                
                const animDefaultframes = Math.max(0.25, data.default_frames || sheetDefaultframes);

                const ignoreFrames = data.ignore || 0;
                const rowMajor = data.majorAxis !== 'y';

                const otherProperties = {};
                for (const key in data) {
                    if (key[0] !== '$' && key[0] !== '_' && builtInProperties.indexOf(key) === -1) {
                        try {
                            otherProperties[key] = evalJSONGameConstant(data[key]);
                        } catch (e) {
                            throw e + " while parsing " + anim + "." + key;
                        }
                    }
                }
                
                const pivot = (data.pivot === undefined) ?
                      sspivot :
                      Object.freeze({x: data.pivot.x - json.sprite_size.x / 2, y: data.pivot.y - json.sprite_size.y / 2});

                const tpivot = (data.pivot === undefined) ?
                      transposedPivot :
                      Object.freeze({x: pivot.y, y: pivot.x})

                // Apply defaults
                if (data.x !== undefined) {
                    // Named sprite, no animation
                    const u = json.transpose ? data.y : data.x, v = json.transpose ? data.x : data.y;
                    if (u < 0 || u >= spritesheet.length || v < 0 || v >= spritesheet[0].length) {
                        throw new Error('Named sprite "' + anim + '" index xy(' + u + ', ' + v + ') ' + (json.transpose ? 'after transpose ' : '') + 'is out of bounds for the ' + spritesheet.length + 'x' + spritesheet[0].length + ' spritesheet "' + url + '".');
                    }

                    const sprite = spritesheet[anim] = spritesheet[u][v];

                    let s = sprite;
                    for (let repeat = 0; repeat < 2; ++repeat) {
                        // Copy other properties
                        Object.assign(s, otherProperties);
                        s.frames = animDefaultframes;
                        s.$animationName = anim;
                        s.$animationIndex = undefined;
                        s.pivot = repeat ? tpivot : pivot;

                        // Rename
                        s.$name = spritesheet.$name + '.' + anim;

                        // Repeat for the transposed sprite
                        s = transposedSpritesheet[v][u];
                    }

                } else {
                
                    if (data.end === undefined) { data.end = Object.assign({}, data.start); }
                    
                    if (data.end.x === undefined) { data.end.x = data.start.x; }
                
                    if (data.end.y === undefined) { data.end.y = data.start.y; }

                    if (data.start.x > data.end.x || data.start.y > data.end.y) {
                        throw new Error('Animation end bounds must be greater than or equal to the end on each axis for animation "' + anim + '".');
                    }
                    
                    const animation = spritesheet[anim] = [];
                    
                    const extrapolate = data.extrapolate || 'loop';
                    animation.extrapolate = extrapolate;

                    const frames = Array.isArray(data.frames) ?
                          data.frames : // array
                          (data.frames !== undefined) ?
                          [data.frames] : // number
                          [animDefaultframes]; // default

                    const W = data.end.x - data.start.x + 1;
                    const H = data.end.y - data.start.y + 1;
                    const N = W * H - ignoreFrames;

                    for (let i = 0; i < N; ++i) {
                        let x, y;
                        if (rowMajor) {
                            x = i % W;
                            y = Math.floor(i / W);
                        } else {
                            y = i % H;
                            x = Math.floor(i / H);
                        }

                        x += data.start.x;
                        y += data.start.y;
                            
                        const u = json.transpose ? y : x, v = json.transpose ? x : y;
                        if (u < 0 || u >= spritesheet.length || v < 0 || v >= spritesheet[0].length) {
                            throw new Error('Index xy(' + u + ', ' + v + ') in animation "' + anim + '" is out of bounds for the ' + spritesheet.length + 'x' + spritesheet[0].length + ' spritesheet.');
                        }
                        
                        const sprite = spritesheet[u][v];
                        
                        for (let repeat = 0, s = sprite; repeat < 2; ++repeat) {
                            s.$animationName = anim;
                            s.$animationIndex = i;
                            s.$name = spritesheet.$name + '.' + anim + '[' + i + ']';
                            s.pivot = repeat ? tpivot : pivot;
                            s.frames = Math.max(0.25, frames[Math.min(i, frames.length - 1)]);
                            s.animation = animation;
                            // Copy other properties
                            Object.assign(s, otherProperties);
                            s = transposedSpritesheet[v][u];
                        }
                        
                        animation.push(sprite);
                    }
                    
                    animation.period = 0;
                    animation.frames = (extrapolate === 'clamp' ? 0 : Infinity);
                    for (let i = 0; i < animation.length; ++i) {
                        const frames = animation[i].frames;
                        switch (extrapolate) {
                        case 'oscillate':
                            // The number of frames is infinite; compute the period
                            if (i === 0 || i === animation.length - 1) {
                                animation.period += frames;
                            } else {
                                animation.period += frames * 2;
                            }
                            break;
                            
                        case 'loop':
                            // The number of frames is infinite; compute the period
                            animation.period += frames;
                            break;

                        default: // clamp
                            animation.frames += frames;
                            break;
                        }
                    }

                    Object.freeze(animation);
                } // if single sprite
            }
        }

        // Create flipped and rotated versions and then freeze all sprites
        for (let x = 0; x < spritesheet.length; ++x) {
            for (let y = 0; y < spritesheet[x].length; ++y) {
                const sprite = spritesheet[x][y];
                const transposedSprite = transposedSpritesheet[y][x];

                // TODO: Transposed pivots
                
                // Construct the flipped versions and freeze all
                sprite.x_flipped = Object.assign({x_flipped:sprite}, sprite);
                sprite.x_flipped.scale = NP;
                sprite.x_flipped.orientation_id += 1;
                sprite.x_flipped.$name += '.x_flipped';
                sprite.x_flipped.pivot = Object.freeze({x: -sprite.pivot.x, y: sprite.pivot.y});

                sprite.y_flipped = Object.assign({y_flipped:sprite}, sprite);
                sprite.y_flipped.orientation_id += 2;
                sprite.y_flipped.scale = PN;
                sprite.y_flipped.$name += '.y_flipped';
                sprite.y_flipped.pivot = Object.freeze({x: sprite.pivot.x, y: -sprite.pivot.y});
                
                sprite.x_flipped.y_flipped = sprite.y_flipped.x_flipped = Object.assign({}, sprite);
                sprite.y_flipped.x_flipped.scale = NN;
                sprite.y_flipped.x_flipped.orientation_id += 3;
                sprite.x_flipped.y_flipped.$name += '.x_flipped.y_flipped';
                sprite.x_flipped.y_flipped.pivot = Object.freeze({x: -sprite.pivot.x, y: -sprite.pivot.y});
                
                transposedSprite.x_flipped = Object.assign({x_flipped: transposedSprite}, transposedSprite);
                transposedSprite.x_flipped.scale = NP;
                transposedSprite.x_flipped.orientation_id += 1;
                transposedSprite.x_flipped.$name = transposedSprite.$name.replace(/\.x_flipped$/, '');
                transposedSprite.x_flipped.pivot = Object.freeze({x: -transposedSprite.pivot.x, y: transposedSprite.pivot.y});
                
                transposedSprite.y_flipped = Object.assign({y_flipped: transposedSprite}, transposedSprite);
                transposedSprite.y_flipped.orientation_id += 2;
                transposedSprite.y_flipped.scale = PN;
                transposedSprite.y_flipped.$name += '.y_flipped';
                transposedSprite.y_flipped.pivot = Object.freeze({x: transposedSprite.pivot.x, y: -transposedSprite.pivot.y});
                
                transposedSprite.x_flipped.y_flipped = transposedSprite.y_flipped.x_flipped = Object.assign({}, transposedSprite);
                transposedSprite.y_flipped.x_flipped.scale = NN;
                transposedSprite.y_flipped.x_flipped.orientation_id += 3;
                transposedSprite.x_flipped.y_flipped.$name += transposedSprite.$name.replace(/\.x_flipped$/, '.y_flipped');
                transposedSprite.x_flipped.y_flipped.pivot = Object.freeze({x: -transposedSprite.pivot.x, y: -transposedSprite.pivot.y});

                sprite.rotated_270 = transposedSprite.x_flipped;
                sprite.x_flipped.rotated_270 = transposedSprite.x_flipped.y_flipped;
                sprite.y_flipped.rotated_270 = transposedSprite;
                sprite.x_flipped.y_flipped.rotated_270 = transposedSprite.y_flipped;

                transposedSprite.rotated_270 = sprite.x_flipped;
                transposedSprite.x_flipped.rotated_270 = sprite.x_flipped.y_flipped;
                transposedSprite.y_flipped.rotated_270 = sprite;
                transposedSprite.x_flipped.y_flipped.rotated_270 = sprite.y_flipped;

                const all = [sprite, transposedSprite];

                // Expand the permutations into an array for the final
                // steps, working backwards so that we can stay in the
                // same array
                for (let i = all.length - 1; i >= 0; --i) {
                    const s = all[i];
                    all.push(s.x_flipped, s.y_flipped, s.y_flipped.x_flipped);
                }

                for (let i = all.length - 1; i >= 0; --i) {
                    // Generate 180 deg and 270 degree rotation
                    // pointers to the existing sprites
                    const s = all[i];
                    s.rotated_180 = s.x_flipped.y_flipped;
                    s.rotated_90 = s.rotated_180.rotated_270;

                    // Verify that all transform elements are set on this sprite
                    console.assert(s.x_flipped);
                    console.assert(s.y_flipped);
                    console.assert(s.x_flipped.y_flipped);
                    console.assert(s.y_flipped.x_flipped);
                    console.assert(s.rotated_90);
                    console.assert(s.rotated_180);
                    console.assert(s.rotated_270);
                    
                    Object.freeze(s);
                } // i
            }
        }

        Object.freeze(spritesheet);
        Object.freeze(transposedSpritesheet);

        console.assert(spritesheet.$index[0] === spritesheetArray.indexOf(spritesheet));
        console.assert(transposedSpritesheet.$index[0] === spritesheetArray.indexOf(transposedSpritesheet));

        console.assert(spritesheet[0][0].rotated_270.$spritesheet.$index[0] === spritesheetArray.indexOf(spritesheet[0][0].rotated_270.$spritesheet),
                       'bad spritesheet index during loading');
        
        if (callback) { callback(spritesheet); }
    }