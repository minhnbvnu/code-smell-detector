function refreshMap(imageInfoUrl) {
  fetch(imageInfoUrl)
    .then(function (response) {
      response
        .json()
        .then(function (imageInfo) {
          const options = new IIIFInfo(imageInfo).getTileSourceOptions();
          if (options === undefined || options.version === undefined) {
            notifyDiv.textContent =
              'Data seems to be no valid IIIF image information.';
            return;
          }
          options.zDirection = -1;
          const iiifTileSource = new IIIF(options);
          layer.setSource(iiifTileSource);
          map.setView(
            new View({
              resolutions: iiifTileSource.getTileGrid().getResolutions(),
              extent: iiifTileSource.getTileGrid().getExtent(),
              constrainOnlyCenter: true,
            }),
          );
          map.getView().fit(iiifTileSource.getTileGrid().getExtent());
          notifyDiv.textContent = '';
        })
        .catch(function (body) {
          notifyDiv.textContent = 'Could not read image info json. ' + body;
        });
    })
    .catch(function () {
      notifyDiv.textContent = 'Could not read data from URL.';
    });
}