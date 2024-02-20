function paceFeedback(pace) {
  var now = new Date();
  switch(pace) {
    case 'faster': paceData.push({time: now, pace: -1}); break; // too fast
    case 'slower': paceData.push({time: now, pace:  1}); break; // too slow
  }

  updatePace();
}