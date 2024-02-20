function convertArtItems(activeArtboard, textFrames, masks, settings) {
  var imgName = getArtboardImageName(activeArtboard, settings);
  var hideTextFrames = !isTrue(settings.testing_mode) && settings.render_text_as != 'image';
  var textFrameCount = textFrames.length;
  var html = '';
  var uniqNames = [];
  var hiddenItems = [];
  var hiddenLayers = [];
  var i;

  checkForOutputFolder(getImageFolder(settings), 'image_output_path');

  if (hideTextFrames) {
    for (i=0; i<textFrameCount; i++) {
      textFrames[i].hidden = true;
    }
  }

  // WIP
  // forEach(findTaggedLayers('svg-symbol'), function(lyr) {
  //   var obj = exportSvgSymbols(lyr, activeArtboard, masks);
  //   html += obj.html;
  //   hiddenItems = hiddenItems.concat(obj.items);
  // });

  // Symbols in :symbol layers are not scaled
  forEach(findTaggedLayers('symbol'), function(lyr) {
    var obj = exportSymbols(lyr, activeArtboard, masks, {scaled: false});
    html += obj.html;
    hiddenItems = hiddenItems.concat(obj.items);
  });

  // Symbols in :div layers are scaled
  forEach(findTaggedLayers('div'), function(lyr) {
    var obj = exportSymbols(lyr, activeArtboard, masks, {scaled: true});
    html += obj.html;
    hiddenItems = hiddenItems.concat(obj.items);
  });

  forEach(findTaggedLayers('svg'), function(lyr) {
    var uniqName = uniqAssetName(getLayerImageName(lyr, activeArtboard, settings), uniqNames);
    var layerHtml = exportImage(uniqName, 'svg', activeArtboard, masks, lyr, settings);
    if (layerHtml) {
      uniqNames.push(uniqName);
      html += layerHtml;
    }
    lyr.visible = false;
    hiddenLayers.push(lyr);
  });

  // Embed images tagged :png as separate images
  // Inside this function, layers are hidden and unhidden as needed
  forEachImageLayer('png', function(lyr) {
    var opts = extend({}, settings, {png_transparent: true});
    var name = getLayerImageName(lyr, activeArtboard, settings);
    var fmt = contains(settings.image_format || [], 'png24') ? 'png24' : 'png';
    // This test prevents empty images, but is expensive when a layer contains many art objects...
    // consider only testing if an option is set by the user.
    if (testLayerArtboardIntersection(lyr, activeArtboard)) {
      html = exportImage(name, fmt, activeArtboard, null, null, opts) + html;
    }
    hiddenLayers.push(lyr); // need to unhide this layer later, after base image is captured
  });
  // placing ab image before other elements
  html = captureArtboardImage(imgName, activeArtboard, masks, settings) + html;
  // unhide hidden layers (if any)
  forEach(hiddenLayers, function(lyr) {
    lyr.visible = true;
  });

  // unhide text frames
  if (hideTextFrames) {
    for (i=0; i<textFrameCount; i++) {
      textFrames[i].hidden = false;
    }
  }

  // unhide items exported as symbols
  forEach(hiddenItems, function(item) {
    item.hidden = false;
  });

  return {html: html};
}