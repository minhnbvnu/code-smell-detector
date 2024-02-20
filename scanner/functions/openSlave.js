function openSlave()
{
  try {
    if(windowIsClosed(slaveWindow)){
        slaveWindow = window.open('./' + window.location.hash, 'toolbar');
    }
    else if(slaveWindow.location.hash != window.location.hash) {
      // maybe we need to reset content?
      slaveWindow.location.href = './' + window.location.hash;
    }

    // give the window time to load before poking at it
    window.setTimeout(function() {
      // maintain the pointer back to the parent.
      slaveWindow.presenterView = window;
      slaveWindow.mode = { track: false, slave: true, follow: false };

      // Add a class to differentiate from the audience view
      slaveWindow.document.getElementById("preso").className = 'display';

      // remove some display view chrome
      $('.slide.activity', slaveWindow.document).removeClass('activity').children('.activityToggle').remove();
      $('#synchronize', slaveWindow.document).remove();

      // call back and update the parent presenter if the window is closed
      slaveWindow.onunload = function(e) {
        slaveWindow.opener.closeSlave(true);
      };
    }, 500);

    $('#slaveWindow').addClass('enabled');
  }
  catch(e) {
    console.log('Failed to open or connect display window. Popup blocker?');
  }
}