function loadStyles() {
  const styleUrl =
    'https://api.maptiler.com/maps/topo-v2/style.json?key=get_your_own_D6rA4zTHduk6KOKTXzGB';

  fetch(styleUrl)
    .then((data) => data.json())
    .then((styleJson) => {
      const buckets = [];
      let currentSource;
      styleJson.layers.forEach((layer) => {
        if (!layer.source) {
          return;
        }
        if (currentSource !== layer.source) {
          currentSource = layer.source;
          buckets.push({
            source: layer.source,
            layers: [],
          });
        }
        buckets[buckets.length - 1].layers.push(layer.id);
      });

      const spriteUrl =
        styleJson.sprite + (pixelRatio > 1 ? '@2x' : '') + '.json';
      const spriteImageUrl =
        styleJson.sprite + (pixelRatio > 1 ? '@2x' : '') + '.png';
      fetch(spriteUrl)
        .then((data) => data.json())
        .then((spriteJson) => {
          buckets.forEach((bucket) => {
            const source = sources[bucket.source];
            if (!source) {
              return;
            }
            const layer = new VectorTileLayer({
              declutter: true,
              source,
              minZoom: source.getTileGrid().getMinZoom(),
            });
            layer.getRenderer().useContainer = function (target, transform) {
              this.containerReused = this.getLayer() !== layers[0];
              this.canvas = canvas;
              this.context = context;
              this.container = {
                firstElementChild: canvas,
                style: {
                  opacity: layer.getOpacity(),
                },
              };
              rendererTransform = transform;
            };
            stylefunction(
              layer,
              styleJson,
              bucket.layers,
              undefined,
              spriteJson,
              spriteImageUrl,
              getFont,
            );
            layers.push(layer);
          });
          worker.postMessage({action: 'requestRender'});
        });
    });
}