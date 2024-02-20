function queryResultMontage(searchResults, i) {
  video.elt.ontimeupdate = function() {
    updateGUI();
    if (i < searchResults.length - 1) {
      if (video.time() > searchResults[i].startTime) {
        currentResult = searchResults[i];
        video.speed(video.speed() / QUARTER_PI);
        print(video.speed(), currentResult.startTimeStamp, currentResult.dialog);
        if (tileMode) {
          var framePos = getFramePos();
          var img = video.get();
          image(img, framePos.x, framePos.y, frameWidth, frameHeight);

          var dialogElement = createSpan(currentResult.dialog);
          dialogElement.addClass('subtitle');
          dialogElement.size(frameWidth, frameHeight);
          dialogElement.position(framePos.x, framePos.y);

          text(currentResult.endTimeStamp, framePos.x, framePos.y);

          col++;
          framePos = getFramePos();
          video.position(framePos.x, framePos.y);
        }
        i++;
      }
    } else {
      video.elt.ontimeupdate = null;
      return false;
    };
  };
}