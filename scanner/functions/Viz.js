function Viz(src) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var format = options.format === undefined ? "svg" : options.format;
  var engine = options.engine === undefined ? "dot" : options.engine;
  var scale = options.scale;
  var totalMemory = options.totalMemory;
  var files = options.files === undefined ? [] : options.files;
  var images = options.images === undefined ? [] : options.images;
  var i;

  for (i = 0; i < images.length; i++) {
    files.push({ path: images[i].path, data: "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg width=\"" + images[i].width + "\" height=\"" + images[i].height + "\"></svg>" });
  }

  if (format == "png-image-element") {
    return Viz.svgXmlToPngImageElement(render(src, "svg", engine, totalMemory, files), scale);
  } else {
    return render(src, format, engine, totalMemory, files);
  }
}