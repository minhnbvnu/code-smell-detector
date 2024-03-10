function fillToolTip(features, layer, options) {
        let content = '';
        let feature;
        let geometry;
        const style = layer.style;
        let fill;
        let stroke;
        let symb = '';
        let prop;

        const context = style.context;

        for (let p = 0; p < features.length; p++) {
            feature = features[p];
            geometry = feature.geometry;

            context.setFeature(feature);
            context.setGeometry(geometry);

            if (feature.type === itowns.FEATURE_TYPES.POLYGON) {
                symb = '&#9724';
                fill = style.fill && style.fill.color;
                stroke = style.stroke && ('1.25px ' + style.stroke.color);
            } else if (feature.type === itowns.FEATURE_TYPES.LINE) {
                symb = '&#9473';
                fill = style.stroke && style.stroke.color;
                stroke = '0px';
            } else if (feature.type === itowns.FEATURE_TYPES.POINT) {
                symb = '&#9679';
                if (style.point || style.icon) {  // Style and style.point can be undefined if no style options were passed
                    fill = (style.point && style.point.color) || (style.icon && style.icon.color);
                    stroke = '1.25px ' + ((style.point && style.point.line) || 'black');
                }
            }

            content += '<div>';
            content += '<span style="color: ' + fill + '; -webkit-text-stroke: ' + stroke + '">';
            content += symb + ' ';
            content += '</span>';

            if (geometry.properties) {
                content += (geometry.properties.description || geometry.properties.name || geometry.properties.nom || geometry.properties.title || layer.name || '');
            }

            if (feature.type === itowns.FEATURE_TYPES.POINT && options.writeLatLong) {
                content += '<br/><span class="coord">long ' + feature.coordinates[0].toFixed(4) + '</span>';
                content += '<br/><span class="coord">lat ' + feature.coordinates[1].toFixed(4) + '</span>';
            }

            if (geometry.properties && !options.filterAllProperties) {
                if (options.format) {
                    for (prop in geometry.properties) {
                        if (!options.filterProperties.includes(prop)) {
                            content += options.format(prop, geometry.properties[prop]) || '';
                        }
                    }
                } else {
                    content += '<ul>';
                    for (prop in geometry.properties) {
                        if (!options.filterProperties.includes(prop)) {
                            content += '<li>' + prop + ': ' + geometry.properties[prop] + '</li>';
                        }
                    }

                    if (content.endsWith('<ul>')) {
                        content = content.replace('<ul>', '');
                    } else {
                        content += '</ul>';
                    }
                }
            }

            content += '</div>';
        }

        return content;
    }