function convertSpecialLayers(activeArtboard, settings) {
  var data = {
    layers: [],
    html_before: '',
    html_after: '',
    video: ''
  };
  forEach(findTaggedLayers('video'), function(lyr) {
    if (objectIsHidden(lyr)) return;
    var str = getSpecialLayerText(lyr, activeArtboard);
    if (!str) return;
    var html = makeVideoHtml(str, settings);
    if (!html) {
      warn('Invalid video URL: ' + str);
    } else {
      data.video = html;
    }
    data.layers.push(lyr);
  });
  forEach(findTaggedLayers('html-before'), function(lyr) {
    if (objectIsHidden(lyr)) return;
    var str = getSpecialLayerText(lyr, activeArtboard);
    if (!str) return;
    data.layers.push(lyr);
    data.html_before = str;
  });
  forEach(findTaggedLayers('html-after'), function(lyr) {
    if (objectIsHidden(lyr)) return;
    var str = getSpecialLayerText(lyr, activeArtboard);
    if (!str) return;
    data.layers.push(lyr);
    data.html_after = str;
  });
  return data.layers.length === 0 ? null : data;
}