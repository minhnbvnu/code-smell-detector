function getTimeInSeconds(timeString) {
  var hours = parseInt(timeString.replace(/:.+$/, ''));
  var minutes = parseInt(timeString.replace(/^\d.+?:|:\d.+$/, ''));
  var seconds = parseInt(timeString.replace(/^\d.+:|(\,|\.).+$/, ''));
  var milSeconds = parseInt(timeString.replace(/^.+(\,|\.)/, ''));
  return (hours * 60 * 60) + (minutes * 60) + seconds + (milSeconds / 1000);
}