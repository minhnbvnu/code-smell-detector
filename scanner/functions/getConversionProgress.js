function getConversionProgress(content){
  // get duration of source
  var matches = (content) ? content.match(/Duration: (.*?), start:/) : [];
  if( matches && matches.length>0 ){
    var rawDuration = matches[1];
    // convert rawDuration from 00:00:00.00 to seconds.
    var ar = rawDuration.split(":").reverse();
    duration = parseFloat(ar[0]);
    if (ar[1]) duration += parseInt(ar[1]) * 60;
    if (ar[2]) duration += parseInt(ar[2]) * 60 * 60;
  } 
  // get the time 
  matches = content.match(/time=(.*?) bitrate/g);
  if( matches && matches.length>0 ){
    var rawTime = matches.pop();
    // needed if there is more than one match
    if (Array.isArray(rawTime)){ 
        rawTime = rawTime.pop().replace('time=','').replace(' bitrate',''); 
    } else {
        rawTime = rawTime.replace('time=','').replace(' bitrate','');
    }

    // convert rawTime from 00:00:00.00 to seconds.
    ar = rawTime.split(":").reverse();
    time = parseFloat(ar[0]);
    if (ar[1]) time += parseInt(ar[1]) * 60;
    if (ar[2]) time += parseInt(ar[2]) * 60 * 60;

    //calculate the progress
    progress = Math.round((time/duration) * 100);
  }
  return progress;
}