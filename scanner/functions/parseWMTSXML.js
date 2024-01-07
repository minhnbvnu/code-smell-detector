function parseWMTSXML(str, requestUrl, options) {
    //IE test success
    if (options.isArcgis == null) {
        options.isArcgis = str.indexOf('arcgis') > -1;
    }
    if (options.isSuperMap == null) {
        options.isSuperMap = str.indexOf('supermap') > -1;
    }
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(str, 'text/xml');
    const content = xmlDoc.querySelectorAll('Contents')[0];
    if (!content) {
        return [];
    }
    const layers = getElementsByTagName(content, 'Layer');
    if (!layers.length) {
        return [];
    }
    const TileMatrixSets = [];
    for (let i = 0, len = content.childNodes.length; i < len; i++) {
        if (content.childNodes[i].localName === 'TileMatrixSet') {
            TileMatrixSets.push(content.childNodes[i]);
        }
    }
    if (!TileMatrixSets.length) {
        return [];
    }
    const result = [];
    for (let i = 0, len = layers.length; i < len; i++) {
        const layer = layers[i];
        let style = layer.querySelectorAll('Style')[0];
        if (style) {
            style = style.getElementsByTagName('ows:Identifier')[0];
            if (style) {
                style = style.textContent;
            }
        }
        let layerName = layer.getElementsByTagName('ows:Identifier')[0];
        if (layerName) {
            layerName = layerName.textContent;
        }
        const tileMatrixSetLinks = getElementsByTagName(layer, 'TileMatrixSetLink');
        if (tileMatrixSetLinks.length === 0) {
            continue;
        }
        for (let j = 0, len1 = tileMatrixSetLinks.length; j < len1; j++) {
            let tileMatrixSetLink = tileMatrixSetLinks[j];
            tileMatrixSetLink = getElementsByTagName(tileMatrixSetLink, 'TileMatrixSet')[0];
            if (tileMatrixSetLink) {
                tileMatrixSetLink = tileMatrixSetLink.textContent;
            }
            const tileMatrixSet = getTileMatrixSet(TileMatrixSets, tileMatrixSetLink);
            if (!tileMatrixSet) {
                continue;
            }
            const resourceURL = layer.querySelectorAll('ResourceURL')[0];
            let url = '';
            if (resourceURL) {
                url = resourceURL.attributes.template.value;
            }
            const { resolutions, tileSize, tileSystem, projection, TileMatrixSet, isGeoServer, levelStr } = parseTileMatrixSet(tileMatrixSet, options);
            //not find ServerURL
            if (!url.length) {
                url = requestUrl.substr(0, requestUrl.lastIndexOf('?'));
                url += '?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER={LAYER}&STYLE={Style}&TILEMATRIXSET={TileMatrixSet}&FORMAT={tiles}&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}';
            }
            const urlTemplate = strReplace(url, [
                ['{LAYER}', layerName],
                ['{Layer}', layerName],
                ['{layer}', layerName],
                ['{STYLE}', style],
                ['{Style}', style],
                ['{style}', style],
                ['{TileMatrixSet}', TileMatrixSet],
                ['{TileMatrix}', isGeoServer ? `${levelStr}:{z}` : '{z}'],
                ['{TileRow}', '{y}'],
                ['{TileCol}', '{x}'],
                ['{tiles}', isGeoServer ? 'image/png' : 'tiles'],
            ]);
            result.push({
                tileSize,
                tileSystem,
                spatialReference: {
                    resolutions,
                    projection
                },
                urlTemplate,
                info: {
                    layerName, TileMatrixSet, style, tileSize, tileSystem, resolutions, projection, urlTemplate
                }
            });
        }

    }
    return result;
}