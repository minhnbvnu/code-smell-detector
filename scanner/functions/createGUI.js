function createGUI() {
  gui = QuickSettings.create(10, 10, document.title);
  gui.addFileChooser('video', 'video file', 'video/*', selectVideoFile);
  gui.addFileChooser('subtitles', 'subtitle file', undefined, selectSubtitleFile);
  gui.addText('searchQuery', searchQuery, setSearchQuery);
  gui.addButton('generateMontage', generateMontage);
  gui.addProgressBar('searchResults', searchResults.length, 0, 'numbers');
  gui.addProgressBar('video time', video.duration(), video.time(), 'numbers');
  gui.addHTML('time', '00:00:00');
  gui.addHTML('speed', '1');
  gui.addHTML('dialog', '');
  gui.addButton('togglePlayback', togglePlayback);
  gui.addBoolean('tileMode', tileMode, setTileMode);
}