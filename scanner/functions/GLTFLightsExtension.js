function GLTFLightsExtension(json) {

  this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;

  var extension = (json.extensions && json.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL]) || {};
  this.lightDefs = extension.lights || [];

}