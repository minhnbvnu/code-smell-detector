function validateTheme(name, options) {

  var fullBackgroundImagePath;

  if (!options || !_.keys(options).length) {
    return console.warn("Theme '" + name + "' is not defined.");
  }

  ["width", "height", "framesPerSecond", "samplesPerFrame"].forEach(function(key){
    if (typeof options[key] !== "number") {
      console.warn("The required property '" + key +"' is missing from theme '" + name + "' or invalid.");
    }
  });

  if (typeof options.backgroundImage === "string") {

    fullBackgroundImagePath = options.backgroundImage;

    if (!path.isAbsolute(options.backgroundImage)) {
      fullBackgroundImagePath = path.join(__dirname, "..", "..", "settings/backgrounds/", options.backgroundImage);
    }

    try {
      fs.accessSync(fullBackgroundImagePath);
    } catch(e) {
      console.warn("Background image for theme '" + name + "' (" + fullBackgroundImagePath + ") does not exist or is not readable.");
    }
  }
}