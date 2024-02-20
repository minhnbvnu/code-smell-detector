function finishedTesting(connectionNumber) {
  // Find key in connections object that matches this number
  for (var i = 0; i < connections.length; i++) {
    if (connections[i].number == connectionNumber) {
      connections[i].returned = true;
      break;
    }
  }

  // Now check them all
  var finished = true;
  for (var j = 0; j < connections.length; j++) {
    if (connections[j].returned != true) {
      finished = false;
      break;
    }
  }

  if (finished) {
    console.log('Expected Number of events: ' + expectedEvents);
    console.log('Actual Number of events: ' + actualEvents);
  }
}