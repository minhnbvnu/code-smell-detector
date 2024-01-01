function entityFactory (opts) {
  var scene = document.createElement('a-scene');
  var assets = document.createElement('a-assets');
  var entity = document.createElement('a-entity');

  scene.appendChild(assets);
  scene.appendChild(entity);

  opts = opts || {};

  if (opts.assets) {
    opts.assets.forEach(function (asset) {
      assets.appendChild(asset);
    });
  }

  document.body.appendChild(scene);
  return entity;
}