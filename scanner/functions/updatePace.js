function updatePace() {
  // pace notices expire in a few minutes
  var cutoff     = 3 * 60 * 1000;
  var expiration = new Date().getTime() - cutoff;

  var scale = 10; // this should max out around 5 clicks in either direction
  var sum   = 50; // start in the middle

  // Loops through and calculates a decaying average
  for (var index = 0; index < paceData.length; index++) {
    var notice = paceData[index];

    if(notice.time < expiration) {
      paceData.splice( index, 1 );
    }
    else {
      var ratio = (notice.time - expiration) / cutoff;
      sum  += (notice.pace * scale * ratio);
    }
  }

  var position = Math.max(Math.min(sum, 90), 10); // between 10 and 90
  $("#paceMarker").css({ left: position+"%" });

  if (position > 50) {
    $("#feedbackPace .obscure.left").css({ width: "50%" });
    $("#feedbackPace .obscure.right").css({ width: (100-position)+"%" });
  }
  else {
    $("#feedbackPace .obscure.right").css({ width: "50%" });
    $("#feedbackPace .obscure.left").css({ width: position+"%" });
  }

  if(position > 75) {
    $("#paceFast").show();
  } else {
    $("#paceFast").hide();
  }
  if(position < 25) {
    $("#paceSlow").show();
  } else {
    $("#paceSlow").hide();
  }
}