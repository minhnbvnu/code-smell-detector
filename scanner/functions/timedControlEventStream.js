function timedControlEventStream(mTime, cmd, disp, connkey, ndx) {
    var mMtime = mTime || 2000;
    NVR.debug("Deferring control " + cmd + " by " + mMtime);
    $timeout(function () {
      subControlStream(cmd, connkey);
    }, mMtime);
  }