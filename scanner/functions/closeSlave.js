function closeSlave(calledByChild) {
  try {
    mode.slave = false;
    $('#slaveWindow').removeClass('enabled');

    if(calledByChild) {
      // if this is called by the display view, we don't want to try to close it again.
      // browsers are the worst. If the user hit *refresh*, then this should reconnect the display view
      window.setTimeout(function() {
        if(! windowIsClosed(slaveWindow)) {
          openSlave();
        }
      }, 500);
    } else {
      // called normally and close the display view
      slaveWindow && slaveWindow.close();
    }
  }
  catch (e) {
    console.log('Display window failed to close properly.');
  }

}