function getFog (data) {
  var fog;
  if (data.type === 'exponential') {
    fog = new THREE.FogExp2(data.color, data.density);
  } else {
    fog = new THREE.Fog(data.color, data.near, data.far);
  }
  fog.name = data.type;
  return fog;
}