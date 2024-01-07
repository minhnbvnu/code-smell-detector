function fireGeometryEvent(geometries) {
            let propagation = true;

            const getOldGeos = () => {
                const geos = this._prevOverGeos && this._prevOverGeos.geos;
                return geos || [];
            };

            const oldGeosMouseout = (oldTargets = [], geoMap = {}) => {
                if (oldTargets && oldTargets.length > 0) {
                    for (let i = oldTargets.length - 1; i >= 0; i--) {
                        const oldTarget = oldTargets[i];
                        if (!isGeo(oldTarget)) {
                            continue;
                        }
                        // const oldTargetId = oldTargets[i]._getInternalId();
                        const oldTargetId = getGeoId(oldTargets[i]);
                        /**
                         * 鼠标经过的新位置中不包含老的目标geometry
                         */
                        if (!geoMap[oldTargetId]) {
                            // propagation = oldTarget._onEvent(domEvent, 'mouseout');
                            propagation = fireGeoEvent(oldTarget, domEvent, 'mouseout');
                        }
                    }
                }
            };
            //鼠标移出地图容器，所有的老的geos触发mouseout,这个属于原来没有做好的地方,现在加上
            if (eventType === 'mouseout') {
                const oldTargets = getOldGeos();
                this._prevOverGeos = {
                    'geos': [],
                    'geomap': {}
                };
                oldGeosMouseout(oldTargets, {});
            } else if (eventType === 'mousemove') {
                const geoMap = {};
                if (geometries.length > 0) {
                    for (let i = geometries.length - 1; i >= 0; i--) {
                        const geo = geometries[i];
                        if (!isGeo(geo)) {
                            continue;
                        }
                        const iid = getGeoId(geo);
                        geoMap[iid] = geo;
                        // geo._onEvent(domEvent);
                        fireGeoEvent(geo, domEvent);
                        if (!this._prevOverGeos || !this._prevOverGeos.geomap[iid]) {
                            // geo._onEvent(domEvent, 'mouseenter');
                            fireGeoEvent(geo, domEvent, 'mouseenter');
                        }
                        // propagation = geo._onEvent(domEvent, 'mouseover');
                        propagation = fireGeoEvent(geo, domEvent, 'mouseover');
                    }
                }

                map._setPriorityCursor(geometryCursorStyle);

                const oldTargets = getOldGeos();
                this._prevOverGeos = {
                    'geos': geometries,
                    'geomap': geoMap
                };
                oldGeosMouseout(oldTargets, geoMap);

            } else {
                if (!geometries || !geometries.length) { return; }
                for (let i = geometries.length - 1; i >= 0; i--) {
                    if (!isGeo(geometries[i])) {
                        continue;
                    }
                    // propagation = geometries[i]._onEvent(domEvent);
                    propagation = fireGeoEvent(geometries[i], domEvent);
                    if (oneMoreEvent) {
                        // geometries[i]._onEvent(domEvent, oneMoreEvent);
                        fireGeoEvent(geometries[i], domEvent, oneMoreEvent);
                    }
                    break;
                }
            }
            if (propagation === false) {
                stopPropagation(domEvent);
            }
        }