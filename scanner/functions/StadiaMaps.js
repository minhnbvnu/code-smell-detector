constructor(options) {
    const i = options.layer.indexOf('-');
    const provider = i == -1 ? options.layer : options.layer.slice(0, i);
    const providerConfig = ProviderConfig[provider] || {
      'minZoom': 0,
      'maxZoom': 20,
      'retina': true,
    };

    const layerConfig = LayerConfig[options.layer];
    const query = options.apiKey ? '?api_key=' + options.apiKey : '';
    const retina = providerConfig.retina && options.retina ? '@2x' : '';

    const url =
      options.url !== undefined
        ? options.url
        : 'https://tiles.stadiamaps.com/tiles/' +
          options.layer +
          '/{z}/{x}/{y}' +
          retina +
          '.' +
          layerConfig.extension +
          query;

    const attributions = [STADIA_ATTRIBUTION, OMT_ATTRIBUTION, OSM_ATTRIBUTION];

    if (options.layer.startsWith('stamen_')) {
      attributions.splice(1, 0, STAMEN_ATTRIBUTION);
    }

    super({
      attributions: attributions,
      cacheSize: options.cacheSize,
      crossOrigin: 'anonymous',
      interpolate: options.interpolate,
      maxZoom:
        options.maxZoom !== undefined
          ? options.maxZoom
          : providerConfig.maxZoom,
      minZoom:
        options.minZoom !== undefined
          ? options.minZoom
          : providerConfig.minZoom,
      opaque: layerConfig.opaque,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileLoadFunction: options.tileLoadFunction,
      transition: options.transition,
      url: url,
      tilePixelRatio: retina ? 2 : 1,
      wrapX: options.wrapX,
      zDirection: options.zDirection,
    });
  }