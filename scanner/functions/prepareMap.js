function prepareMap(fullExtent) {
        var container = document.createElement('div');
        container.style.width = '100px';
        container.style.height = '100px';
        document.body.appendChild(container);
        return  new maptalks.Map(container, {
            'spatialReference' : {
                'resolutions' : [1, 2, 4],
                'projection' : 'EPSG:4326',
                'fullExtent' : fullExtent
            },
            'zoom' : 1,
            'center' : [0, 0]
        });
    }