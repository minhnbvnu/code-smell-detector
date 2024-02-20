function updateGUI() {
  gui.setProgressMax('searchResults', searchResults.length);
  gui.setValue('searchResults', searchResults.indexOf(currentResult) + 1);
  gui.setProgressMax('video time', round(video.duration()));
  gui.setValue('video time', round(video.time()));
  gui.setValue('speed', '<code>' + video.speed() + '</code>');
  subtitles.forEach(function(subtitle) {
    if (video.time() > subtitle.startTime && video.time() < subtitle.endTime) {
      gui.setValue('time', '<code>' + subtitle.startTimeStamp + '</code>');
      gui.setValue('dialog', '<code>' + subtitle.dialog + '</code>');
    }
  });
}